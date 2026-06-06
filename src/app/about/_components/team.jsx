'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TeamImpactSection() {
  const [visibleBars, setVisibleBars] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const impactRef = useRef(null);

  const teamMembers = [
    { name: "Sabri Salumu", role: "Developer" },
    { name: "Radhia Omary", role: "Manager" },
    { name: "Jocelyne Paul", role: "Community Liason" },
    { name: "Junior Marandu", role: "UX/UI Designer" },
    { name: "Pio Rwehumbiza", role: "IT analyst" }
  ];

  const impactMetrics = [
    { label: "Inclusive Communication Design", percentage: 98 },
    { label: "Interface Organization & Accessibility", percentage: 80 },
    { label: "Assistive Technology & Sign Language", percentage: 90 },
    { label: "User-centered Support & Interaction", percentage: 87 }
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
      { threshold: 0.2 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextMember = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Get active members for rendering based on layout index
  const getActiveMembers = () => {
    const list = [];
    for (let i = 0; i < teamMembers.length; i++) {
      list.push(teamMembers[(startIndex + i) % teamMembers.length]);
    }
    return list;
  };

  return (
    <div className="w-full bg-white py-16 relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Team Members Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            {/* Header Title */}
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-black text-black leading-tight">
                Our <span className="text-[#1b64da]">Team</span>
                <br />
                Members
              </h2>
            </div>
            
            {/* Carousel Container */}
            <div className="lg:col-span-8 overflow-hidden">
              <div className="flex gap-4 transition-all duration-500 ease-in-out">
                {getActiveMembers().slice(0, 4).map((member, index) => (
                  <div 
                    key={member.name}
                    className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0 group bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex flex-col justify-between h-[280px]"
                  >
                    {/* Top blank space for image placeholder */}
                    <div className="flex-grow flex items-center justify-center bg-white rounded-t-2xl">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity">
                        <span className="text-[10px] text-gray-400 font-bold">BS</span>
                      </div>
                    </div>
                    
                    {/* Purple horizontal dividing accent bar */}
                    <div className="w-full h-1.5 bg-[#b28bf5] my-4 rounded-full"></div>
                    
                    {/* Member details */}
                    <div className="text-center pb-2">
                      <h3 className="text-[17px] font-bold text-gray-800 mb-1 group-hover:text-[#1b64da] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows - Text-like thin arrows placed at the bottom right */}
          <div className="flex justify-end gap-3 pr-2">
            <button 
              onClick={prevMember}
              className="text-[#8b5cf6] hover:text-[#8b5cf6]/70 p-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-8 h-8 stroke-[1.5]" />
            </button>
            <button 
              onClick={nextMember}
              className="text-[#8b5cf6] hover:text-[#8b5cf6]/70 p-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-8 h-8 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Impact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          
          {/* Left Column - Impact Header and Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl font-black text-black leading-tight">
              Our
              <br />
              <span className="text-[#1b64da]">Impact</span>
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 font-bold italic text-md uppercase tracking-wider">
                "BREAKING BARRIERS, MEASURING SUCCESS"
              </p>
              <p className="text-gray-700 text-[15px] leading-relaxed max-w-md">
                At Bridging Silence, we quantify our mission through 
                tangible outcomes that bridge the gap between Deaf 
                and hearing communities.
              </p>
            </div>
          </div>

          {/* Right Column - Progress Bars */}
          <div ref={impactRef} className="lg:col-span-7 space-y-6 pt-2">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                {/* Metric Label */}
                <div className="text-sm font-bold text-gray-800">
                  {metric.label}
                </div>
                
                {/* Progress bar track */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 relative">
                  {/* Blue fill */}
                  <div 
                    className="bg-[#1b64da] h-1.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: visibleBars ? `${metric.percentage}%` : '0%',
                      transitionDelay: `${index * 150}ms`
                    }}
                  ></div>
                  
                  {/* Purple Percentage Pill sitting directly on the bar */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 bg-[#8b5cf6] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md transition-all duration-1000 ease-out flex items-center justify-center"
                    style={{ 
                      left: visibleBars ? `${metric.percentage}%` : '0%',
                      transform: 'translate(-50%, -50%)',
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    {metric.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlapping Blue and Purple Decorative circles bottom-left */}
        <div className="absolute bottom-[-50px] left-[-50px] pointer-events-none z-0">
          <div className="relative w-36 h-36">
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#1b64da] rounded-full opacity-[0.95]"></div>
            <div className="absolute bottom-4 left-16 w-24 h-24 bg-[#8b5cf6] rounded-full opacity-[0.95]"></div>
          </div>
        </div>

      </div>
    </div>
  );
}