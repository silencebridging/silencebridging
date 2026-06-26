'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LibraryImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreviews() {
      try {
        // 1. Fetch Cloudinary previews
        const res = await fetch('/api/cloudinary/gallery');
        if (!res.ok) throw new Error('Cloudinary fetch failed.');
        const data = await res.json();
        const cloudinaryImages = data.resources?.slice(0, 3) || [];

        // 2. Fetch metadata from Supabase
        const { data: dbMetadata } = await supabase
          .from('cloudinary_metadata')
          .select('*');

        const metaMap = {};
        dbMetadata?.forEach(item => {
          metaMap[item.public_id] = item;
        });

        // Combined data
        const combined = cloudinaryImages.map(img => ({
          ...img,
          meta: metaMap[img.public_id] || null
        }));

        setImages(combined);
      } catch (err) {
        console.error('Failed to load preview images from Cloudinary:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPreviews();
  }, []);

  // Helper check for custom user-configured metadata
  const isCustomMetadata = (img) => {
    if (!img.meta || !img.meta.title) return false;
    const title = img.meta.title;
    if (
      title.toUpperCase().startsWith('PXL_') ||
      title.toLowerCase().startsWith('onboarding') ||
      /^[a-z0-9]{20}$/i.test(title)
    ) {
      return false;
    }
    return true;
  };

  return (
    <section className="w-full py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b64da]/10 text-[#1b64da] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Event Archives
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
              Our Visual <span className="text-[#1b64da]">Library</span>
            </h2>
            
            <p className="text-gray-600 text-[16px] leading-relaxed">
              Explore the history and impact of Bridging Silence through our media library. 
              Here we showcase the smiles, milestones, and moments from our events, 
              workshops, and community collaborations across the country.
            </p>
            
            <div className="pt-2">
              <Link 
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-[#1b64da] hover:bg-[#1550b4] text-white px-8 py-4 rounded-full font-bold text-[15px] shadow-lg shadow-blue-500/20 transition-all hover:translate-y-[-2px] group"
              >
                Explore Full Gallery
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Right Column: Dynamic Visual Collage */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 aspect-[4/3] bg-gray-100 rounded-3xl animate-pulse" />
                <div className="col-span-4 flex flex-col gap-4">
                  <div className="flex-grow aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                  <div className="flex-grow aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="w-full aspect-[4/3] rounded-3xl bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#1b64da]/10 flex items-center justify-center text-[#1b64da] mb-4">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Your Media Gallery is Empty</h3>
                <p className="text-gray-500 text-sm max-w-sm mt-1">
                  Upload images to Cloudinary to see them displayed here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                {/* Main large image */}
                <Link 
                  href={`/gallery/photo?id=${encodeURIComponent(images[0].public_id)}`}
                  className={`${images.length === 1 ? 'col-span-12' : 'col-span-8'} group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl border border-gray-100 block`}
                >
                  <img 
                    src={images[0].secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_600/')} 
                    alt="Main Gallery Event" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isCustomMetadata(images[0]) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                      {images[0].meta.tags && (
                        <span className="bg-[#8b5cf6] text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full w-fit mb-2">
                          {images[0].meta.tags}
                        </span>
                      )}
                      <h3 className="text-white text-base font-bold truncate">
                        {images[0].meta.title}
                      </h3>
                    </div>
                  )}
                </Link>

                {/* Sidebar small images if we have more than 1 image */}
                {images.length > 1 && (
                  <div className="col-span-4 flex flex-col gap-4">
                    {images.slice(1, 3).map((img) => (
                      <Link 
                        key={img.public_id} 
                        href={`/gallery/photo?id=${encodeURIComponent(img.public_id)}`}
                        className="group relative overflow-hidden rounded-2xl flex-grow aspect-square shadow-lg border border-gray-100 block"
                      >
                        <img 
                          src={img.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_300/')} 
                          alt="Gallery Event Thumbnail" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {isCustomMetadata(img) && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex flex-col justify-end p-4">
                            {img.meta.tags && (
                              <span className="bg-[#1b64da] text-white text-[8px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full w-fit mb-1">
                                {img.meta.tags}
                              </span>
                            )}
                            <h4 className="text-white text-xs font-semibold truncate">
                              {img.meta.title}
                            </h4>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
