'use client';

import React from 'react';
import { Mic, MessageSquare, Volume2, Hand } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BridgingSilenceHero() {
  const router = useRouter();

  const navigateToSignToSpeech = () => {
    router.push('/services/signToSpeech');
  };

  const navigateToSignToText = () => {
    router.push('/services/signToText');
  };

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden py-16 flex items-center">
      
      {/* Background cylinders behind the cards (slanted capsule shapes) */}
      <div className="absolute top-[18%] left-[45%] z-0 hidden xl:flex space-x-6 transform -rotate-[35deg] pointer-events-none">
        <div className="w-12 h-80 bg-sky-400 rounded-full opacity-[0.85] shadow-sm"></div>
        <div className="w-12 h-80 bg-[#8b5cf6] rounded-full opacity-[0.85] shadow-sm -translate-y-8"></div>
      </div>

      {/* Bottom right corner slanted bands */}
      <div className="absolute bottom-[-150px] right-[-150px] pointer-events-none z-0 hidden lg:block">
        <div className="relative w-96 h-96">
          <div className="absolute bottom-0 right-0 w-16 h-[600px] bg-sky-400 rounded-full transform -rotate-[45deg] origin-bottom-right opacity-[0.85]"></div>
          <div className="absolute bottom-0 right-0 w-16 h-[600px] bg-[#8b5cf6] rounded-full transform -rotate-[45deg] origin-bottom-right translate-x-12 opacity-[0.85]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left side - Main Card */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="bg-white rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-gray-100/60 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                Breaking <span className="text-[#1b64da]">Barriers,</span> Building{' '}
                <span className="text-[#1b64da]">Connections.</span>
              </h1>
              
              <p className="text-gray-600 text-[16px] sm:text-lg leading-relaxed mb-10 font-normal">
                Bridging Silence transforms communication between Deaf and Hearing communities 
                through real-time AI tools, workshops, and inclusive designs. Our technology ensures no 
                one is left out of the conversation. Through our technology hand gestures are captured, 
                interpreted and instantly displays the meaning as text on screen and audible 
                speech through a speaker.
              </p>
              
              <button className="bg-white border border-[#1b64da] text-[#1b64da] px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#1b64da]/5 transition-all duration-300 transform active:scale-95 cursor-pointer">
                Translate to Swahili
              </button>
            </div>
          </div>
          
          {/* Right side - Staggered feature cards (Column 1 is shifted down) */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center pt-8 lg:pt-0">
            <div className="flex gap-6 md:gap-8 justify-center items-start">
              
              {/* Left Column (Shifted Downwards for stagger) */}
              <div className="flex flex-col gap-6 md:gap-8 transform md:translate-y-20">
                {/* Sign Language Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-100 w-40 sm:w-44 h-56 sm:h-64 flex flex-col justify-between items-center p-6 hover:shadow-xl hover:scale-102 transition-all duration-300 cursor-pointer">
                  <div className="flex-grow flex items-center justify-center">
                    <Hand className="w-10 h-10 text-[#8b5cf6]" />
                  </div>
                  <h3 className="font-semibold text-[#1b64da] text-[15px] sm:text-[17px] text-center italic">
                    Sign Language
                  </h3>
                </div>
                
                {/* Sign-to-Sauti Card (Navigates to /services/signToSpeech) */}
                <div 
                  onClick={navigateToSignToSpeech}
                  className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-blue-200 w-40 sm:w-44 h-56 sm:h-64 flex flex-col justify-between items-center p-6 hover:shadow-xl hover:scale-102 transition-all duration-300 cursor-pointer animate-pulse-blue"
                >
                  <div className="flex-grow flex items-center justify-center">
                    <Volume2 className="w-10 h-10 text-[#8b5cf6]" />
                  </div>
                  <h3 className="font-semibold text-[#1b64da] text-[15px] sm:text-[17px] text-center italic">
                    Sign-to-Sauti
                  </h3>
                </div>
              </div>
              
              {/* Right Column (Starts at standard top level) */}
              <div className="flex flex-col gap-6 md:gap-8">
                {/* Sauti-to-Sign Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-100 w-40 sm:w-44 h-56 sm:h-64 flex flex-col justify-between items-center p-6 hover:shadow-xl hover:scale-102 transition-all duration-300 cursor-pointer">
                  <div className="flex-grow flex items-center justify-center">
                    <Mic className="w-10 h-10 text-[#8b5cf6]" />
                  </div>
                  <h3 className="font-semibold text-[#1b64da] text-[15px] sm:text-[17px] text-center italic">
                    Sauti-to-Sign
                  </h3>
                </div>
                
                {/* Sign-to-Text Card (Navigates to /services/signToText) */}
                <div 
                  onClick={navigateToSignToText}
                  className="bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-100 w-40 sm:w-44 h-56 sm:h-64 flex flex-col justify-between items-center p-6 hover:shadow-xl hover:scale-102 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-grow flex items-center justify-center">
                    <MessageSquare className="w-10 h-10 text-[#8b5cf6]" />
                  </div>
                  <h3 className="font-semibold text-[#1b64da] text-[15px] sm:text-[17px] text-center italic">
                    Sign-to-Text
                  </h3>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
      <style jsx>{`
        @keyframes pulseBlue {
          0%, 100% {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 0 0 0px rgba(59, 130, 246, 0.15), 0 10px 35px rgba(0,0,0,0.04);
          }
          50% {
            border-color: rgba(59, 130, 246, 0.85);
            box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.35), 0 10px 35px rgba(59, 130, 246, 0.1);
          }
        }
        .animate-pulse-blue {
          animation: pulseBlue 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}