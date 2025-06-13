"use client"
import React from 'react';
import { Mic, MessageSquare, Volume2 } from 'lucide-react';

const VoiceServicesComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Side - Service Cards arranged exactly like image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              
              {/* Top Left - Sign Language */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-fade-in">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <div className="text-white text-2xl">👋</div>
                  </div>
                  <h3 className="text-blue-600 font-medium text-base">Sign Language</h3>
                </div>
              </div>
              
              {/* Top Right - Sauli-to-Sign */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-fade-in delay-100">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-blue-600 font-medium text-base">Sauli-to-Sign</h3>
                </div>
              </div>
              
              {/* Bottom Left - Sign-to-Sauli */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-fade-in delay-200">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-blue-600 font-medium text-base">Sign-to-Sauli</h3>
                </div>
              </div>
              
              {/* Bottom Right - Sign-to-Text */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group animate-fade-in delay-300">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-blue-600 font-medium text-base">Sign-to-Text</h3>
                </div>
              </div>
            </div>
            
            {/* Bottom Buttons - exactly positioned like image */}
            <div className="flex justify-center space-x-4 mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
                Get Started
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm">
                Join Live Conversation
              </button>
            </div>
          </div>
          
          {/* Right Side - Content exactly like image */}
          <div className="space-y-8 animate-fade-in delay-500">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Every{' '}
                <span className="text-blue-600">Voice</span>{' '}
                Deserve To Be{' '}
                <span className="text-blue-600">Heard</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                Bridging Silence creates seamless communication between spoken and signed languages through innovative technology.
              </p>
            </div>
            
            <div>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
                How to start?
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default VoiceServicesComponent;