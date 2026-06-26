'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, GraduationCap, Info } from 'lucide-react';

export default function TeamImpactSection() {
  const [visibleBars, setVisibleBars] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const impactRef = useRef(null);

  const teamMembers = [
    { 
      name: "Benedictus Gwasa", 
      role: "Hardware Lead", 
      image: "/bridging silence team/benedictus gwasa.jpeg",
      bio: "Designs and builds the SautiBox hardware prototype, integrating the microcontroller, speaker, and camera module for offline sign language interpretation.",
      skills: ["Hardware Prototyping", "CAD Design", "System Integration"]
    },
    { 
      name: "Elibariki Lotha", 
      role: "Embedded Developer", 
      image: "/bridging silence team/elibariki lotha.jpeg",
      bio: "Develops embedded firmware for the SautiBox microcontroller, optimizing power consumption and sensor data acquisition for reliable real-time translation.",
      skills: ["C/C++", "Microcontrollers", "Firmware Optimization"]
    },
    { 
      name: "Ezekia Paul", 
      role: "Signal Processing Developer", 
      image: "/bridging silence team/ezekia paul.jpeg",
      bio: "Implements digital signal processing algorithms and gesture recognition models to filter noisy landmark data from cameras for accurate translations.",
      skills: ["Signal Processing", "Algorithm Design", "Python/C++"]
    },
    { 
      name: "Jocelyn Joshua", 
      role: "Community Liaison & Testing Coordinator", 
      image: "/bridging silence team/jocelyn joshua.jpeg",
      bio: "Coordinates community outreach, runs user testing sessions with Deaf students and teachers, and gathers design feedback to refine the gestures database.",
      skills: ["Community Engagement", "User Testing", "Swahili Sign Language"]
    },
    { 
      name: "Sabri Salumu", 
      role: "Core Software Developer", 
      image: null,
      bio: "Develops the core web interface and Next.js interfaces, integrating webcams and real-time landmark tracking systems to translate Tanzanian Sign Language (TSL).",
      skills: ["React/Next.js", "MediaPipe Holistic", "API Integration"]
    },
    { 
      name: "Radhia Omary", 
      role: "Project Manager", 
      image: null,
      bio: "Leads project management, coordinates milestones, and ensures the engineering team matches medical/assistive device compliance and usability standards.",
      skills: ["Agile Management", "Device Compliance", "Strategic Planning"]
    },
    { 
      name: "Junior Marandu", 
      role: "UX/UI Designer", 
      image: null,
      bio: "Designs the UX/UI flow, wireframes, and glassmorphic visual system for the web app to ensure maximum accessibility and user engagement.",
      skills: ["Figma", "User Interface Design", "Accessibility Standards"]
    },
    { 
      name: "Pio Rwehumbiza", 
      role: "IT Analyst & Database Admin", 
      image: null,
      bio: "Analyzes IT requirements, structures the Supabase database metadata for Cloudinary image uploads, and configures reliable local network integration for SautiBox.",
      skills: ["Database Design", "Network Security", "Cloud Integration"]
    }
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

  // Get active members for rendering based on layout index (showing 4 cards at a time)
  const getActiveMembers = () => {
    const list = [];
    for (let i = 0; i < teamMembers.length; i++) {
      list.push(teamMembers[(startIndex + i) % teamMembers.length]);
    }
    return list;
  };

  return (
    <div className="w-full bg-transparent py-16 relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Team Members Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            {/* Header Title */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-4xl font-black text-black leading-tight">
                Our <span className="text-[#1b64da]">Team</span>
                <br />
                Members
              </h2>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-xs">
                We are a passionate group of <span className="text-blue-600 font-bold">Biomedical Engineering students</span> at <span className="text-[#8b5cf6] font-bold">MUHAS</span>, applying clinical engineering and assistive technology to bridge communication gaps.
              </p>
            </div>
            
            {/* Carousel Container */}
            <div className="lg:col-span-8 overflow-hidden py-4">
              <div className="flex gap-4 transition-all duration-500 ease-in-out">
                {getActiveMembers().slice(0, 4).map((member) => (
                  <div 
                    key={member.name}
                    onClick={() => setSelectedMember(member)}
                    className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] flex-shrink-0 group bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex flex-col items-center justify-between h-[320px] cursor-pointer"
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Image / Avatar */}
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-indigo-50 group-hover:border-[#8b5cf6]/40 shadow-sm flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-50 shrink-0 transition-colors duration-300">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-xl font-bold text-[#1b64da] tracking-wider">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      
                      {/* Member details */}
                      <div className="text-center">
                        <h3 className="text-[16px] font-bold text-gray-800 mb-0.5 group-hover:text-[#1b64da] transition-colors duration-300 truncate w-full max-w-[150px]">
                          {member.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider line-clamp-1">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    
                    {/* Divider line accent */}
                    <div className="w-10 h-1 bg-[#b28bf5] rounded-full group-hover:w-16 transition-all duration-300 my-2"></div>
                    
                    <span className="text-[11px] text-blue-600 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Bio <ArrowRight className="w-3.5 h-3.5" />
                    </span>
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
              aria-label="Previous Team Member"
            >
              <ArrowLeft className="w-8 h-8 stroke-[1.5]" />
            </button>
            <button 
              onClick={nextMember}
              className="text-[#8b5cf6] hover:text-[#8b5cf6]/70 p-2 transition-all transform active:scale-95 cursor-pointer"
              aria-label="Next Team Member"
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

      {/* Modal Dialog for Team Member Mini Profile Page */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col md:flex-row transition-transform duration-300 scale-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full p-2 z-10 transition-colors cursor-pointer"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Photo / Gradient Accent */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-[#8b5cf6] p-8 flex flex-col items-center justify-center text-center relative shrink-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent)] pointer-events-none" />
              
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mb-4 bg-white flex items-center justify-center shrink-0">
                {selectedMember.image ? (
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-3xl font-bold text-indigo-600">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-white leading-tight">
                {selectedMember.name}
              </h3>
              <p className="text-xs text-blue-100 font-extrabold uppercase tracking-widest mt-1.5">
                {selectedMember.role}
              </p>
            </div>

            {/* Right Side: University, Major & Bio details */}
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
              <div className="space-y-5">
                
                {/* University Affiliation Box */}
                <div className="flex items-start gap-3 bg-blue-50/70 border border-blue-100/40 p-4 rounded-2xl">
                  <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] sm:text-xs leading-tight">
                    <p className="font-extrabold text-blue-900 uppercase tracking-wide">
                      MUHAS Student
                    </p>
                    <p className="text-blue-700 font-bold mt-0.5">
                      B.Sc. in Biomedical Engineering
                    </p>
                    <p className="text-blue-500/80 font-medium mt-0.5">
                      Muhimbili University of Health and Allied Sciences
                    </p>
                  </div>
                </div>

                {/* About Bio */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gray-400" /> Project Role & Work
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Key Skills */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="bg-indigo-50 text-indigo-600 text-[10px] font-extrabold px-3 py-1 rounded-full border border-indigo-100/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Close Button / Bottom Info */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold mt-4">
                <span>Bridging Silence Team</span>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="text-blue-600 hover:text-blue-800 font-extrabold cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </div>
  );
}