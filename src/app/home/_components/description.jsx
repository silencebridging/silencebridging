'use client'
import React from 'react';
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
            
            <button className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <span className="font-medium">Watch Video</span>
            </button>
          </div>
          
          {/* Right Illustration */}
          <div className="flex justify-center animate-fade-in delay-300">
            <div className="relative">
              <div className="w-80 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-lg">
                {/* Illustration placeholder - two people with communication symbols */}
                <div className="flex items-center justify-center h-full space-x-8">
                  {/* Person 1 */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-300 rounded-full"></div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                  
                  {/* Person 2 */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-300 rounded-full"></div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative leaves */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-70 transform rotate-45"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-70 transform rotate-12"></div>
                <div className="absolute top-8 -right-2 w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section 2 - The Solution */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center animate-fade-in delay-200">
            <div className="relative">
              <div className="w-80 h-64 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                {/* Placeholder for crowd/community image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-2 p-8">
                    {Array.from({length: 16}).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full ${
                          i % 3 === 0 ? 'bg-blue-400' : 
                          i % 3 === 1 ? 'bg-orange-400' : 'bg-green-400'
                        } opacity-80`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
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
            
            <button className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 group">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <span className="font-medium">Watch Demo</span>
              <span className="text-xl">🎯</span>
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