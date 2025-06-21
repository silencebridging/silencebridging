import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function TeamImpactSection() {
  const [visibleBars, setVisibleBars] = useState(false);
  const impactRef = useRef(null);
  const teamMembers = [
    {
      name: "Sabri Salumu",
      role: "Developer"
    },
    {
      name: "Radhia Omary",
      role: "Manager"
    },
    {
      name: "Jocelyne Paul",
      role: "Community Liason"
    },
    {
      name: "Junior Marandu",
      role: "UX/UI Designer"
    }
  ];

  const impactMetrics = [
    {
      label: "Inclusive Communication Design",
      percentage: 93,
      color: "bg-blue-500"
    },
    {
      label: "Interface Organization & Accessibility",
      percentage: 88,
      color: "bg-purple-500"
    },
    {
      label: "Assistive Technology & Sign Language",
      percentage: 90,
      color: "bg-purple-600"
    },
    {
      label: "User-centered Support & Interaction",
      percentage: 87,
      color: "bg-blue-600"
    }
  ];

  // Intersection Observer for progress bars animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleBars(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Team Section */}
        <div className="mb-10 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center sm:text-left">
            Our <span className="text-blue-600">Team</span>
            <br />
            Members
          </h2>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transform transition-all duration-300 hover:border-purple-200 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Purple accent bar with animation */}
                  <div className="w-full h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mb-5 sm:mb-8 group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300"></div>
                  
                  {/* Member info */}
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-purple-700 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center sm:justify-end mt-4 sm:mt-6 space-x-2">
              <button className="p-2 sm:p-3 rounded-full bg-purple-100 hover:bg-purple-200 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </button>
              <button className="p-2 sm:p-3 rounded-full bg-purple-100 hover:bg-purple-200 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column - Title and Quote */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
              Our
              <br />
              <span className="text-blue-600">Impact</span>
            </h2>
            
            <div className="mb-6">
              <p className="text-base sm:text-lg font-bold text-gray-900 italic mb-3 sm:mb-4">
                "BREAKING BARRIERS, MEASURING SUCCESS"
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                At Bridging Silence, we quantify our mission through 
                tangible outcomes that bridge the gap between Deaf 
                and hearing communities.
              </p>
            </div>
          </div>

          {/* Right Column - Progress Bars */}
          <div ref={impactRef} className="space-y-4 sm:space-y-6">
            {impactMetrics.map((metric, index) => (
              <div 
                key={index}
                className="opacity-0 animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-0">
                    {metric.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-purple-600 bg-purple-100 px-2 sm:px-3 py-1 rounded-full animate-bounce-in self-start sm:self-auto" 
                        style={{ animationDelay: `${(index * 200) + 800}ms` }}>
                    {visibleBars ? metric.percentage : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
                  <div 
                    className={`${metric.color} h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out shadow-md relative overflow-hidden`}
                    style={{ 
                      width: visibleBars ? `${metric.percentage}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-10 sm:mt-16 flex justify-start space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-400 rounded-full opacity-80 animate-pulse"></div>
          <div className="w-12 h-12 sm:w-20 sm:h-20 bg-purple-500 rounded-full opacity-90 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
          animation-fill-mode: forwards;
          transform: scale(0);
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}