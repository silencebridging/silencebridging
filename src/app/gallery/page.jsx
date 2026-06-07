'use client';

import React, { useState, useEffect } from 'react';
import HeaderComponent from '@/components/navBar';
import Footer from '@/components/footer';
import { Image as ImageIcon, RefreshCw, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Cloudinary images
      const res = await fetch('/api/cloudinary/gallery');
      if (!res.ok) {
        throw new Error('Failed to load assets from Cloudinary.');
      }
      const data = await res.json();
      const cloudinaryImages = data.resources || [];

      // 2. Fetch metadata from Supabase
      const { data: dbMetadata, error: dbError } = await supabase
        .from('cloudinary_metadata')
        .select('*');

      if (dbError) {
        console.warn('Failed to load database metadata:', dbError.message);
      }

      // Map metadata by public_id
      const metaMap = {};
      dbMetadata?.forEach(item => {
        metaMap[item.public_id] = item;
      });

      // Combine images with their metadata
      const combined = cloudinaryImages.map(img => ({
        ...img,
        meta: metaMap[img.public_id] || null
      }));

      setImages(combined);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f8faff]">
      <HeaderComponent />

      <main className="flex-grow w-full py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-1 text-[#1b64da] hover:text-[#1550b4] font-semibold text-sm mb-3 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to About
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight">
                Event Media <span className="text-[#1b64da]">Library</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm md:text-[15px]">
                Browse our community milestone galleries. Click any image to view details, descriptions, and sharing links.
              </p>
            </div>
            
            <button 
              onClick={fetchGallery}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#1b64da]" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync Library
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8 flex flex-col items-center text-center max-w-xl mx-auto shadow-sm">
              <span className="text-lg font-bold mb-2">Sync Failed</span>
              <p className="text-sm opacity-90 mb-4">{error}</p>
              <button 
                onClick={fetchGallery}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="aspect-[4/3] w-full rounded-3xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-gray-100 p-16 rounded-3xl text-center max-w-lg mx-auto shadow-md space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#1b64da]/10 flex items-center justify-center mx-auto text-[#1b64da]">
                <ImageIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">No Images Found</h3>
                <p className="text-gray-500 text-sm mt-2">
                  We couldn't find any uploaded images in your Cloudinary account directory.
                </p>
              </div>
            </div>
          ) : (
            /* Pure Visual Gallery Grid - No white cards, borders, padding, or raw text */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => {
                // Large optimized image resolution
                const optimizedUrl = img.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
                const hasMeta = !!img.meta;
                const title = hasMeta && img.meta.title ? img.meta.title : 'Event Photo';
                
                return (
                  <Link 
                    key={img.public_id}
                    href={`/gallery/photo?id=${encodeURIComponent(img.public_id)}`}
                    className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100 border border-gray-200/40 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 group block"
                  >
                    {/* Image */}
                    <img 
                      src={optimizedUrl} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Elegant overlay showing only on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                      {hasMeta && img.meta.tags && (
                        <span className="bg-[#1b64da] text-white text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full w-fit mb-2">
                          {img.meta.tags}
                        </span>
                      )}
                      <h3 className="text-white text-lg font-black leading-tight line-clamp-1">
                        {title}
                      </h3>
                      <p className="text-white/80 text-[11px] font-semibold mt-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {hasMeta ? img.meta.event_date : new Date(img.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
