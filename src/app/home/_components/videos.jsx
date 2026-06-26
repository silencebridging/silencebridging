'use client';
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import SponsorsSection from '@/components/sponsors';
import { useLanguage } from '@/context/LanguageContext';

const SignMuseumComponent = () => {
  const [activeVideo, setActiveVideo] = useState(2);
  const { language, t } = useLanguage();
  
  const videos = [
    {
      id: 0,
      src: "/videos/ambukiza.mp4",
      title: "ambukiza"
    },
    {
      id: 1,
      src: "/videos/angalia.mp4",
      title: "angalia"
    },
    {
      id: 2,
      src: "/videos/angalifu.mp4",
      title: "angalifu"
    },
    {
      id: 3,
      src: "/videos/kitengo.mp4",
      title: "kitengo"
    },
    {
      id: 4,
      src: "/videos/tofali.mp4",
      title: "tofali"
    }
  ];

  // Automate the carousel progression and reset the timer on manual click
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval);
  }, [activeVideo, videos.length]);

  const getVisibleVideos = () => {
    const prevIndex = (activeVideo - 1 + videos.length) % videos.length;
    const nextIndex = (activeVideo + 1) % videos.length;
    return [
      { ...videos[prevIndex], originalIndex: prevIndex },
      { ...videos[activeVideo], originalIndex: activeVideo },
      { ...videos[nextIndex], originalIndex: nextIndex }
    ];
  };

  return (
    <div className="bg-transparent py-20 px-6 relative overflow-hidden z-10">
      
      {/* Bottom Left angled animated pills/capsules (cylinders) - matching the layout and opacity from the screenshot */}
      <div className="absolute bottom-[-80px] left-[-20px] md:bottom-[-140px] md:left-[-30px] flex gap-4 rotate-[40deg] opacity-95 pointer-events-none z-0">
        <div className="w-14 h-56 md:w-20 md:h-80 bg-[#00adef] rounded-full animate-float-slow" />
        <div className="w-14 h-56 md:w-20 md:h-80 bg-[#7c3aed] rounded-full animate-float-fast" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Sign Museum Videos Section */}
        <div className="text-center space-y-12 mb-20">
          {language === 'sw' ? (
            <h2 className="text-4xl font-bold text-gray-900">
              Makumbusho ya <span className="text-blue-600">Video za Alama</span>
            </h2>
          ) : (
            <h2 className="text-4xl font-bold text-gray-900">
              <span className="text-blue-600">Sign</span> Museum <span className="text-blue-600">Videos</span>
            </h2>
          )}
          
          {/* Carousel container without Navigation Buttons */}
          <div className="flex items-center justify-center max-w-5xl mx-auto py-4 overflow-visible">
            {/* Video Gallery - shows exactly three videos on desktop, one on mobile */}
            <div className="flex flex-1 justify-center items-center gap-4 md:gap-8 py-4 overflow-visible">
              {getVisibleVideos().map((video, visibleIndex) => {
                const isActive = video.originalIndex === activeVideo;
                // Hide non-active videos on mobile (indices 0 and 2 in the 3-visible array)
                const visibilityClass = isActive ? 'block' : 'hidden sm:block';
                return (
                  <div 
                    key={video.id}
                    className={`${visibilityClass} relative cursor-pointer transition-all duration-500 ease-in-out ${
                      isActive 
                        ? 'w-[280px] h-[180px] md:w-[320px] md:h-[200px] scale-105 md:scale-110 z-10' 
                        : 'w-[160px] h-[100px] md:w-[220px] md:h-[140px] opacity-60 hover:opacity-90'
                    }`}
                    onClick={() => setActiveVideo(video.originalIndex)}
                  >
                    <div className="w-full h-full bg-black rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                      <video
                        key={`${video.id}-${isActive}`}
                        src={video.src}
                        className="w-full h-full object-cover rounded-2xl"
                        autoPlay={isActive}
                        loop
                        muted
                        playsInline
                      />
                      
                      {/* Shadow overlay and play button for inactive video */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center transition-opacity duration-300 hover:bg-black/20">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-black/60 rounded-full flex items-center justify-center shadow-md">
                            <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" />
                          </div>
                        </div>
                      )}
                      
                      {/* Active video border */}
                      {isActive && (
                        <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl pointer-events-none animate-pulse"></div>
                      )}
                      
                      {/* Video title overlay */}
                      <div className="absolute bottom-2 left-3 bg-black/60 px-3 py-1 rounded-full text-white text-[10px] md:text-xs font-bold capitalize tracking-wide z-20">
                        {video.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {videos.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeVideo ? 'w-8 bg-blue-600' : 'w-4 bg-gray-300'
                }`}
                onClick={() => setActiveVideo(index)}
              ></div>
            ))}
          </div>
          
          {/* Description and CTA */}
          <div className="space-y-6">
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              {t('vid_desc')}
            </p>
            
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
              {t('vid_view_all')}
            </button>
          </div>
        </div>
        
        {/* Trusted By Section (reused shared SponsorsSection component) */}
        <SponsorsSection />
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
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignMuseumComponent;