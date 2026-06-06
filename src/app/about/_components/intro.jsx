'use client';
import React from 'react';
import { Mic, Languages, Volume2, MessageSquare } from 'lucide-react';

const GearIcon = ({ className }) => (
  <svg className={`${className} fill-none stroke-blue-800/20`} viewBox="0 0 24 24" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export default function MissionSection() {
  const features = [
    {
      icon: <Mic className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Sauti-to-Sign"
    },
    {
      icon: <Languages className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Sign Language"
    },
    {
      icon: <Volume2 className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Sign-to-Sauti"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#8b5cf6]" />,
      title: "Sign-to-Text"
    }
  ];

  const stats = [
    {
      number: "5+",
      label: "Years Perfecting Sign-Tech"
    },
    {
      number: "98%",
      label: "Translation Accuracy"
    },
    {
      number: "10K+",
      label: "Lives Impacted"
    },
    {
      number: "99%",
      label: "User Satisfaction"
    }
  ];

  // Random positions for gear background decorations
  const gears = [
    { top: '10%', left: '8%', size: 'w-10 h-10', delay: '0s' },
    { top: '35%', left: '5%', size: 'w-8 h-8', delay: '1s' },
    { top: '75%', left: '9%', size: 'w-12 h-12', delay: '0.5s' },
    { top: '20%', left: '25%', size: 'w-12 h-12', delay: '2s' },
    { top: '80%', left: '26%', size: 'w-10 h-10', delay: '1.5s' },
    { top: '65%', left: '50%', size: 'w-10 h-10', delay: '3s' },
    { top: '15%', left: '55%', size: 'w-8 h-8', delay: '0.5s' },
    { top: '12%', left: '71%', size: 'w-10 h-10', delay: '2.5s' },
    { top: '78%', left: '44%', size: 'w-12 h-12', delay: '1s' },
    { top: '82%', left: '67%', size: 'w-10 h-10', delay: '0.8s' },
    { top: '15%', left: '81%', size: 'w-12 h-12', delay: '1.2s' },
    { top: '70%', left: '79%', size: 'w-10 h-10', delay: '2s' },
    { top: '85%', left: '94%', size: 'w-12 h-12', delay: '0.3s' },
    { top: '45%', left: '95%', size: 'w-8 h-8', delay: '1.7s' },
    { top: '68%', left: '16%', size: 'w-10 h-10', delay: '2.2s' },
    { top: '62%', left: '38%', size: 'w-8 h-8', delay: '1.1s' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Big Title */}
          <div className="lg:col-span-5 text-left pt-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-[1.15] tracking-tight">
              Where <span className="text-[#1b64da]">Hand</span>
              <br />
              Speak and
              <br />
              Voices Are <span className="text-[#1b64da]">Heard</span>
            </h1>
          </div>

          {/* Right Column - Mission Text & Nestled Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-black tracking-wide mb-6">
                OUR MISSION...
              </h2>
              <div className="text-gray-700 text-[15px] leading-relaxed space-y-4 font-normal">
                <p>
                  We empower the Deaf and hearing communities to connect effortlessly 
                  through innovative technology. By breaking down communication 
                  barriers, we create a world where no conversation is left unheard.
                </p>
                <p>
                  Through our flagship innovation, the <span className="font-bold">SautiBox</span>, we provide an affordable, 
                  offline-capable device that captures sign language and converts it into 
                  audible speech and readable text- in real time.
                </p>
                <p>
                  Whether in rural villages or busy urban centers, our mission is to ensure 
                  that no voice goes unheard. We are building technology that doesn't just 
                  translate signs- it builds understanding, empathy, and inclusion for all.
                </p>
              </div>
            </div>

            {/* Nestled Features Grid matching screenshot (text on right of icons) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {/* Circular icon wrapper */}
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md border border-purple-100 flex-shrink-0">
                    {feature.icon}
                  </div>
                  {/* Blue italic title */}
                  <span className="text-[#1b64da] font-semibold text-[16px] italic">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with animated gears */}
      <div className="bg-[#1b64da] relative overflow-hidden">
        {/* Gear background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          {gears.map((gear, i) => (
            <div
              key={i}
              className={`absolute ${gear.size}`}
              style={{
                left: gear.left,
                top: gear.top,
                animationDelay: gear.delay,
              }}
            >
              <GearIcon className="w-full h-full animate-[spin_10s_linear_infinite]" />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Large white number */}
                <div className="text-white text-5xl md:text-6xl font-black mb-4 tracking-tight">
                  {stat.number}
                </div>
                {/* Purple pill label */}
                <div className="bg-[#8b5cf6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}