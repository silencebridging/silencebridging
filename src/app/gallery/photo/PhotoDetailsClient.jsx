'use client';

import React, { useState } from 'react';
import HeaderComponent from '@/components/navBar';
import Footer from '@/components/footer';
import { ArrowLeft, Calendar, Tag, Share2, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PhotoDetailsClient({ publicId, initialMeta, initialError }) {
  const [copied, setCopied] = useState(false);

  const getDisplayTitle = () => {
    if (initialMeta && initialMeta.title) return initialMeta.title;
    if (!publicId) return 'Event Photo';
    
    const filename = publicId.split('/').pop() || '';
    if (
      filename.toUpperCase().startsWith('PXL') ||
      filename.toLowerCase().startsWith('onboarding') ||
      /^[a-z0-9]{20}$/i.test(filename)
    ) {
      return 'Event Photo';
    }
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/gallery/photo?id=${encodeURIComponent(publicId)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (initialError || !publicId) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-[#f8faff]">
        <HeaderComponent />
        <main className="flex-grow w-full py-16 flex items-center justify-center">
          <div className="max-w-xl w-full mx-auto px-4 text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-3xl shadow-sm space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold">Failed to load photo</h2>
              <p className="text-sm opacity-90">{initialError || 'The image could not be retrieved.'}</p>
              <Link 
                href="/gallery"
                className="inline-block bg-[#1b64da] hover:bg-[#1550b4] text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all mt-2"
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate Cloudinary URL directly using client-accessible environment variable or fallback
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dazoduog2';
  const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1200/${publicId}`;

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f8faff]">
      <HeaderComponent />
      
      <main className="flex-grow w-full py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Navigation and Actions Row */}
          <div className="flex items-center justify-between gap-4 py-6 mb-4">
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-1 text-[#1b64da] hover:text-[#1550b4] font-bold text-sm transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Gallery
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-[#1b64da] hover:bg-[#1550b4] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Copy Share Link
                </>
              )}
            </button>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            
            {/* Left Column: Big Image Display */}
            <div className="lg:col-span-8 bg-white p-3 rounded-3xl border border-gray-200/60 shadow-md">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 aspect-[16/10] sm:aspect-[16/9]">
                <img 
                  src={optimizedUrl} 
                  alt={getDisplayTitle()} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Right Column: Descriptions and Info */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/60 shadow-md space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  {getDisplayTitle()}
                </h1>
                
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                    <Calendar className="w-4 h-4 text-[#1b64da]" />
                    {initialMeta ? initialMeta.event_date : 'Event Highlight'}
                  </span>

                  {initialMeta?.tags && (
                    <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-extrabold uppercase tracking-wider">
                      <Tag className="w-3 h-3" />
                      {initialMeta.tags}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">Event Details</h3>
                
                {initialMeta?.description ? (
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {initialMeta.description}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Explore this event highlight from our Bridging Silence community.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
