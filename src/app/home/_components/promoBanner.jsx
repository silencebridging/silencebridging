'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Camera, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PromoBannerComponent() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="w-full px-6 md:px-12 lg:px-20 -mt-16 md:-mt-24 pb-4 relative z-20 font-sans">
      {/* Floating Centered Card Design */}
      <div className="relative overflow-hidden bg-white border border-slate-100/90 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_70px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col items-center text-center justify-center gap-6 group max-w-4xl mx-auto">
        
        {/* Top Left decorative dot pattern */}
        <div className="absolute top-6 left-6 opacity-20 pointer-events-none">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-slate-400 rounded-full" />
            ))}
          </div>
        </div>

        {/* Bottom Right decorative dot pattern */}
        <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-slate-400 rounded-full" />
            ))}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight tracking-tight max-w-2xl">
          Real-Time Camera <br />Translation is{' '}
          <span className="text-indigo-600 relative inline-block">
            Live!
            <svg className="absolute -bottom-2.5 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
              <path d="M3,9 C30,3 70,3 97,9 C65,11 35,11 3,9" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
          {t('banner_desc')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => router.push('/services/signToSpeech')}
            className="px-6 py-4 rounded-2xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-extrabold text-xs md:text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer group/btn"
          >
            <span className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
              <Camera className="w-3.5 h-3.5" />
            </span>
            {t('banner_cta_speech')}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => router.push('/services/signToText')}
            className="px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-extrabold text-xs md:text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer group/btn2"
          >
            <span className="w-5 h-5 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
            {t('banner_cta_text')}
            <ArrowRight className="w-4 h-4 group-hover/btn2:translate-x-1 transition-transform text-indigo-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
