import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    // Fetch uploaded images from Cloudinary.
    // We can use the resource API to get standard image resources.
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 24
    });

    return NextResponse.json({ resources: result.resources });
  } catch (error) {
    console.error('Error fetching resources from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve Cloudinary assets.' },
      { status: 500 }
    );
  }
}
