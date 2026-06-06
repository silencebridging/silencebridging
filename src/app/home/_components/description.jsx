'use client'
import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const ProblemSolutionComponent = () => {
  return (
    <div className="bg-white py-16 px-6 relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500 to-purple-600 opacity-20 rounded-tl-full"></div>
      
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section 1 - The Problem */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-4">
              <span className="text-6xl font-bold text-gray-400">1.</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              The <span className="text-blue-600">Silent Struggle</span> is Real.
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              466 million people including students live with disabling hearing loss, yet everyday conversation 
              remain a challenge. Misunderstandings, isolation, and lack of accessible tools creates barriers 
              between the Deaf and hearing worlds.
            </p>
            
            <button className="flex items-center space-x-4 bg-transparent border-0 p-0 cursor-pointer group">
              <div className="relative w-12 h-12 rounded-full bg-[#aec9f9] flex items-center justify-center shadow-[0_4px_14px_rgba(27,100,218,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(27,100,218,0.35)]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#1b64da] flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <span className="font-semibold text-[#1b64da] text-base group-hover:text-[#1552b9] transition-colors duration-300">
                Watch Video
              </span>
            </button>
          </div>
          
          {/* Right Illustration */}
          <div className="flex justify-center animate-fade-in delay-300">
            <div className="relative w-80 h-64 flex items-center justify-center">
              <Image 
                src="/doodles/undraw_friendly-guy-avatar_dqp5.svg" 
                alt="Friendly Guy Avatar Illustration" 
                width={320} 
                height={256}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Section 2 - The Solution */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center animate-fade-in delay-200">
            <div className="relative w-80 h-64 flex items-center justify-center">
              <Image 
                src="/doodles/undraw_messages_okui.svg" 
                alt="Messages Illustration" 
                width={320} 
                height={256}
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className="space-y-6 animate-fade-in delay-400">
            <div className="flex items-center space-x-4">
              <span className="text-6xl font-bold text-gray-400">2.</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Bridging <span className="text-blue-600">Silence</span> Fixes This.
            </h2>
            
            <p className="text-lg text-blue-600 font-medium italic">
              Where Technology Meets Inclusion
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We turn barriers into bridges with real-time tools: 
              <span className="italic font-medium"> speech-to-text, sign language translation</span>, and 
              <span className="italic font-medium"> inclusive community platforms</span>. Now everyone 
              can connect without limits.
            </p>
            
            <button className="flex items-center space-x-4 bg-transparent border-0 p-0 cursor-pointer group">
              <div className="relative w-12 h-12 rounded-full bg-[#aec9f9] flex items-center justify-center shadow-[0_4px_14px_rgba(27,100,218,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(27,100,218,0.35)]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#1b64da] flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <span className="font-semibold text-[#1b64da] text-base group-hover:text-[#1552b9] transition-colors duration-300 flex items-center space-x-1">
                <span>Watch Demo</span>
                <span className="text-xl">🎯</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default ProblemSolutionComponent;