'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MessageSquare, Volume2, Fingerprint } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const VoiceServicesComponent = () => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-[600px] md:min-h-[800px] bg-transparent p-6 md:p-12 lg:p-20 relative overflow-hidden flex items-center justify-center font-sans z-10">
      
      {/* Top Left angled animated pills/capsules */}
      <div className="absolute top-[-80px] left-[-20px] md:top-[-140px] md:left-[-30px] flex gap-4 rotate-[40deg] opacity-95 pointer-events-none z-0">
        <div className="w-14 h-56 md:w-20 md:h-80 bg-[#00adef] rounded-full animate-float-slow" />
        <div className="w-14 h-56 md:w-20 md:h-80 bg-[#7c3aed] rounded-full animate-float-fast" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Staggered Cards Layout */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              
              {/* Column 1: Left Column (Normal Alignment) */}
              <div className="space-y-6 flex flex-col justify-center">
                {/* 1. Sign Language Card */}
                <div 
                  onClick={() => router.push('/services')}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12)] border border-gray-100/50 flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-500 transition-transform duration-300 group-hover:scale-110">
                    <Fingerprint className="w-10 h-10" />
                  </div>
                  <h3 className="text-blue-600 font-extrabold text-[13px] md:text-sm italic tracking-wide mt-4">
                    {t('srv_sign_language')}
                  </h3>
                </div>

                {/* 2. Sign-to-Sauti Card */}
                <div 
                  onClick={() => router.push('/services/signToSpeech')}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] border border-blue-200/80 flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-pulse-blue"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-500 transition-transform duration-300 group-hover:scale-110">
                    <Volume2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-blue-600 font-extrabold text-[13px] md:text-sm italic tracking-wide mt-4">
                    {t('srv_sign_to_sauti')}
                  </h3>
                </div>
              </div>

              {/* Column 2: Right Column (Shifted upwards / Offset) */}
              <div className="space-y-6 flex flex-col justify-center lg:-mt-12">
                {/* 3. Sauti-to-Sign Card */}
                <div 
                  onClick={() => router.push('/services/signToSpeech')}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12)] border border-gray-100/50 flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-500 transition-transform duration-300 group-hover:scale-110">
                    <Mic className="w-10 h-10" />
                  </div>
                  <h3 className="text-blue-600 font-extrabold text-[13px] md:text-sm italic tracking-wide mt-4">
                    {t('srv_sauti_to_sign')}
                  </h3>
                </div>

                {/* 4. Sign-to-Text Card */}
                <div 
                  onClick={() => router.push('/services/signToSpeech')}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12)] border border-gray-100/50 flex flex-col items-center justify-center text-center aspect-square transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-500 transition-transform duration-300 group-hover:scale-110">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                  <h3 className="text-blue-600 font-extrabold text-[13px] md:text-sm italic tracking-wide mt-4">
                    {t('srv_sign_to_text')}
                  </h3>
                </div>
              </div>

            </div>

            {/* Outlined Action Buttons */}
            <div className="flex justify-center gap-4 mt-12 w-full">
              <button 
                onClick={() => router.push('/services/signToSpeech')}
                className="border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t('nav_get_started')}
              </button>
              <button 
                onClick={() => router.push('/services/signToSpeech')}
                className="border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t('srv_join_live')}
              </button>
            </div>
          </div>

          {/* Right Side: Headline and copy */}
          <div className="text-left space-y-6 lg:pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {t('srv_title_bold_1')} <span className="text-blue-600">{t('srv_title_color_1')}</span> {t('srv_title_bold_2')} <span className="text-blue-600">{t('srv_title_color_2')}</span>
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium max-w-lg">
              {t('srv_desc')}
            </p>

            <div className="pt-2">
              <button 
                onClick={() => router.push('/services')}
                className="border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300"
              >
                {t('srv_how_to_start')}
              </button>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(0.98); }
        }
        @keyframes pulseBlue {
          0%, 100% {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.15), 0 10px 30px -5px rgba(0,0,0,0.08);
          }
          50% {
            border-color: rgba(59, 130, 246, 0.85);
            box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.35), 0 20px 40px -5px rgba(59, 130, 246, 0.1);
          }
        }
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 6s ease-in-out infinite;
        }
        .animate-pulse-blue {
          animation: pulseBlue 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default VoiceServicesComponent;