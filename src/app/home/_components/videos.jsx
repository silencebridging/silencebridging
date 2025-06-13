'use client';
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const SignMuseumComponent = () => {
  const [activeVideo, setActiveVideo] = useState(1);
  
  const videos = [
    {
      id: 0,
      thumbnail: "bg-gradient-to-br from-pink-200 to-orange-200",
      content: "Two women communicating"
    },
    {
      id: 1,
      thumbnail: "bg-gradient-to-br from-blue-200 to-gray-300",
      content: "Man in purple shirt signing"
    },
    {
      id: 2,
      thumbnail: "bg-gradient-to-br from-gray-200 to-blue-200",
      content: "Person in modern setting"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 relative overflow-hidden">
      {/* Background decorative gradient */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400 to-purple-600 opacity-20 rounded-tr-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto">
        
        {/* Sign Museum Videos Section */}
        <div className="text-center space-y-12 mb-20">
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Sign</span> Museum <span className="text-blue-600">Videos</span>
          </h2>
          
          {/* Video Gallery */}
          <div className="flex justify-center items-center space-x-8">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className={`relative cursor-pointer transition-all duration-500 ${
                  index === 1 ? 'w-80 h-52 scale-110 z-10' : 'w-64 h-40 opacity-70 hover:opacity-90'
                }`}
                onClick={() => setActiveVideo(index)}
              >
                <div className={`w-full h-full ${video.thumbnail} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden`}>
                  {/* Video thumbnail content placeholder */}
                  <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl"></div>
                  
                  {/* Play button */}
                  <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300 group">
                    <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Video border for active video */}
                  {index === 1 && (
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {videos.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeVideo ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          {/* Description and CTA */}
          <div className="space-y-6">
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              By clicking the button below, explore all videos of TSL...
            </p>
            
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
              View All 121+ Videos
            </button>
          </div>
        </div>
        
        {/* Trusted By Section */}
        <div className="text-center space-y-12 relative z-10">
          <h2 className="text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Trusted</span> By The World's <span className="text-blue-600">Best</span>
          </h2>
          
          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {/* AT&T */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-gray-700">AT&T</span>
            </div>
            
            {/* Microsoft */}
            <div className="flex items-center space-x-2">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="bg-red-500 w-full h-full"></div>
                <div className="bg-green-500 w-full h-full"></div>
                <div className="bg-blue-500 w-full h-full"></div>
                <div className="bg-yellow-500 w-full h-full"></div>
              </div>
              <span className="text-xl font-semibold text-gray-700">Microsoft</span>
            </div>
            
            {/* Google */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </span>
            </div>
            
            {/* Skoll Foundation */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-red-600">skoll</span>
              <div className="text-sm text-gray-600">
                <div>FOUNDATION</div>
              </div>
            </div>
            
            {/* Verizon */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-gray-700">verizon</span>
            </div>
            
            {/* World Health Organization */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-bold">WHO</div>
              </div>
              <div className="text-sm text-blue-600 font-semibold">
                <div>World Health</div>
                <div>Organization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignMuseumComponent;