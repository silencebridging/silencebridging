'use client';

import React from 'react';
import { Check } from 'lucide-react';

export default function WhyChooseUsAnimated() {
  const features = [
    {
      title: "TSL translation",
      subtitle: "Real Time",
      items: [
        "Instant Communication",
        "Accurate recognition",
        "100+ TSL sign languages",
        "Supports slang variations",
        "Learns and Improves"
      ]
    },
    {
      title: "Training Mode",
      subtitle: "Helpful",
      items: [
        "Visual and Audio aids",
        "Interactive modules for all",
        "Practice mode to improve skills",
        "Certification-ready learning path",
        "Mutual understanding improvement"
      ]
    },
    {
      title: "Communication",
      subtitle: "Two-way communication",
      items: [
        "Easy conversion",
        "Supports voice-to-text",
        "Seamless turn-taking in real-time conversation",
        "Adaptive system",
        "Empower independent communication"
      ]
    },
    {
      title: "Customizable",
      subtitle: "Customizable experience",
      items: [
        "Easy personalization",
        "Easy changes in settings",
        "Modular components",
        "Accessible",
        "Dashboard settings for user preference"
      ]
    },
    {
      title: "Support",
      subtitle: "24/7 Support",
      items: [
        "Easy help access",
        "Live Chats, FAQ's and Guides",
        "Community-based Programs",
        "Regular updates from User Feedbacks",
        "Support during Deployment"
      ]
    }
  ];

  return (
    <div className="w-full bg-white relative overflow-hidden py-20">
      
      {/* Background cylinders clipping the top-right corner */}
      <div className="absolute top-0 right-[-30px] pointer-events-none z-0 hidden sm:block">
        <div className="relative w-48 h-36">
          <div className="absolute top-[-10px] right-[40px] w-10 h-36 bg-sky-400 rounded-full transform -rotate-[45deg] opacity-[0.85] shadow-sm"></div>
          <div className="absolute top-[-10px] right-0 w-10 h-36 bg-[#8b5cf6] rounded-full transform -rotate-[45deg] opacity-[0.85] shadow-sm"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Styled like screenshot with italic "Why Choose" and bold blue "Us?" */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900">
            <span className="italic font-normal">Why Choose</span>{' '}
            <span className="text-[#1b64da] font-black">Us?</span>
          </h2>
        </div>

        {/* Features Column Layout - floating cardless design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col justify-start items-start">
              {/* Feature Title (Purple) */}
              <h3 className="text-3xl font-medium text-[#8b5cf6] mb-2 tracking-tight">
                {feature.title}
              </h3>
              
              {/* Feature Subtitle (Blue) */}
              <p className="text-[#1b64da] font-bold text-sm tracking-wide mb-6 uppercase">
                {feature.subtitle}
              </p>

              {/* Items checklist (Purple checkboxes and text) */}
              <div className="space-y-4 w-full">
                {feature.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3 text-left">
                    <Check className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                    <span className="text-[#8b5cf6]/90 text-sm font-semibold leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}