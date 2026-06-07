import { createClient } from '@supabase/supabase-js';
import PhotoDetailsClient from './PhotoDetailsClient';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Dynamically generate Open Graph (OG) and Twitter meta tags so that when the link is shared,
// WhatsApp, Facebook, LinkedIn, Twitter/X, and Slack display the actual event image and description preview!
export async function generateMetadata({ searchParams }) {
  // Await searchParams as it is a Promise in Next.js 15+
  const resolvedSearchParams = await searchParams;
  const publicId = resolvedSearchParams?.id;
  
  if (!publicId) {
    return {
      title: 'Event Photo | Bridging Silence',
      description: 'Media archives and milestones from Bridging Silence.',
    };
  }

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dazoduog2';
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_800/${publicId}`;

    const { data: meta } = await supabase
      .from('cloudinary_metadata')
      .select('title, description')
      .eq('public_id', publicId)
      .single();

    const displayTitle = meta?.title || 'Event Photo';
    const displayDescription = meta?.description || 'Explore this event highlight from Bridging Silence.';

    return {
      title: `${displayTitle} | Bridging Silence`,
      description: displayDescription,
      openGraph: {
        title: displayTitle,
        description: displayDescription,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 500,
            alt: displayTitle,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: displayTitle,
        description: displayDescription,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Metadata generation failed:', error);
    return {
      title: 'Event Photo | Bridging Silence',
    };
  }
}

export default async function PhotoDetailsPage({ searchParams }) {
  // Await searchParams as it is a Promise in Next.js 15+
  const resolvedSearchParams = await searchParams;
  const publicId = resolvedSearchParams?.id;
  
  let meta = null;
  let error = null;

  if (publicId) {
    try {
      const { data: dbMeta, error: dbError } = await supabase
        .from('cloudinary_metadata')
        .select('*')
        .eq('public_id', publicId)
        .single();
      
      // PGRST116 means zero rows returned, which is fine (unconfigured photos)
      if (dbError && dbError.code !== 'PGRST116') {
        console.warn('Database fetch error:', dbError.message);
      }
      
      meta = dbMeta || null;
    } catch (err) {
      console.error('Failed to load metadata server-side:', err);
    }
  } else {
    error = 'No image selected.';
  }

  return (
    <PhotoDetailsClient 
      publicId={publicId} 
      initialMeta={meta} 
      initialError={error} 
    />
  );
}
