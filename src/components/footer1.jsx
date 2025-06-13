import React from 'react';
import { Home, ChevronUp, MessageCircle } from 'lucide-react';

const SponsorsSection = () => {
  const navigationLinks = [
    { name: 'Home', href: '#', icon: Home, active: false },
    { name: 'About Us', href: '#', active: true },
    { name: 'Services', href: '#', active: false },
    { name: "FAQ's", href: '#', active: false },
    { name: 'Blog', href: '#', active: false },
    { name: 'Contact Us', href: '#', active: false }
  ];

  const sponsors = [
    {
      name: 'AT&T',
      logo: (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="text-white font-bold text-sm">@</div>
          </div>
          <span className="text-blue-600 font-semibold text-xl">AT&T</span>
        </div>
      )
    },
    {
      name: 'Microsoft',
      logo: (
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-red-500 w-2 h-2"></div>
            <div className="bg-green-500 w-2 h-2"></div>
            <div className="bg-blue-500 w-2 h-2"></div>
            <div className="bg-yellow-500 w-2 h-2"></div>
          </div>
          <span className="text-gray-700 font-medium text-lg">Microsoft</span>
        </div>
      )
    },
    {
      name: 'Google',
      logo: (
        <div className="text-2xl font-medium">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </div>
      )
    },
    {
      name: 'Skoll',
      logo: (
        <div className="flex items-center gap-2">
          <div className="text-red-600 font-bold text-2xl">skoll</div>
          <div className="text-xs text-gray-500">
            <div>FOUNDATION</div>
          </div>
        </div>
      )
    },
    {
      name: 'Verizon',
      logo: (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <div className="text-white text-xs font-bold">✓</div>
          </div>
          <span className="text-black font-medium text-lg">verizon</span>
        </div>
      )
    },
    {
      name: 'WHO',
      logo: (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-1">
            <div className="text-white font-bold text-xs">WHO</div>
          </div>
          <div className="text-xs text-center text-blue-600 font-medium">
            <div>World Health</div>
            <div>Organization</div>
          </div>
        </div>
      )
    }
  ];

  const socialIcons = [
    {
      name: 'WhatsApp',
      bgColor: 'bg-green-500',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12.017 2C6.5 2 2.017 6.5 2.017 12c0 1.767.459 3.425 1.267 4.867L2.017 22l5.233-1.267C8.675 21.542 10.333 22 12.017 22c5.5 0 10-4.5 10-10S17.517 2 12.017 2zm5.308 14.292c-.225.633-1.34 1.183-1.842 1.225-.467.042-.867.184-2.917-.608-2.542-1-4.142-3.617-4.267-3.783-.117-.167-.967-1.283-.967-2.45s.617-1.733.833-1.967c.217-.233.475-.292.633-.292s.317.008.458.017c.142.008.333-.058.517.392.192.458.658 1.608.717 1.725.058.117.092.258.017.417-.075.158-.117.25-.233.383-.117.133-.25.3-.358.4-.117.117-.242.242-.1.475.142.233.625 1.033 1.342 1.675 1.017.875 1.767 1.142 2.017 1.267.25.125.392.1.533-.067.142-.167.608-.708.775-.95.167-.242.333-.2.558-.117.225.083 1.442.683 1.692.808.25.125.417.183.475.292.058.108.058.608-.167 1.242z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      bgColor: 'bg-blue-600',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      bgColor: 'bg-black',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      bgColor: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500',
      icon: (
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.016 6.756.08 5.526.146 4.677.278 3.936.525a5.88 5.88 0 00-2.124 1.384A5.88 5.88 0 00.525 3.936C.278 4.677.146 5.526.08 6.756.016 7.989 0 8.396 0 12.017s.016 4.028.08 5.261c.066 1.23.198 2.079.445 2.82a5.88 5.88 0 001.384 2.124 5.88 5.88 0 002.124 1.384c.741.247 1.59.379 2.82.445 1.233.066 1.64.082 5.261.082s4.028-.016 5.261-.082c1.23-.066 2.079-.198 2.82-.445a5.88 5.88 0 002.124-1.384 5.88 5.88 0 001.384-2.124c.247-.741.379-1.59.445-2.82.066-1.233.082-1.64.082-5.261s-.016-4.028-.082-5.261c-.066-1.23-.198-2.079-.445-2.82a5.88 5.88 0 00-1.384-2.124A5.88 5.88 0 0019.877.525C19.136.278 18.287.146 17.057.08 15.824.016 15.417 0 12.017 0zm0 2.167c3.343 0 3.737.014 5.056.08 1.22.056 1.88.249 2.32.413.583.226 1 .497 1.437.934.437.437.708.854.934 1.437.164.44.357 1.1.413 2.32.066 1.319.08 1.713.08 5.056s-.014 3.737-.08 5.056c-.056 1.22-.249 1.88-.413 2.32-.226.583-.497 1-.934 1.437-.437.437-.854.708-1.437.934-.44.164-1.1.357-2.32.413-1.319.066-1.713.08-5.056.08s-3.737-.014-5.056-.08c-1.22-.056-1.88-.249-2.32-.413-.583-.226-1-.497-1.437-.934-.437-.437-.708-.854-.934-1.437-.164-.44-.357-1.1-.413-2.32-.066-1.319-.08-1.713-.08-5.056s.014-3.737.08-5.056c.056-1.22.249-1.88.413-2.32.226-.583.497-1 .934-1.437.437-.437.854-.708 1.437-.934.44-.164 1.1-.357 2.32-.413 1.319-.066 1.713-.08 5.056-.08zm0 3.683a6.167 6.167 0 100 12.334 6.167 6.167 0 000-12.334zm0 10.167a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
        </svg>
      )
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute top-0 left-0 w-full h-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 transform -skew-y-2 origin-top-left scale-110"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Our Sponsors Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Our <span className="text-blue-600">Sponsors</span>
          </h2>

          {/* Sponsor Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mb-16">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex items-center justify-center h-20 w-full">
                {sponsor.logo}
              </div>
            ))}
          </div>

          {/* Sponsor Text Labels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-gray-600 italic">
            <div className="text-center">
              <p className="font-medium">HEARING_THE_UNHEARD</p>
            </div>
            <div className="text-center">
              <p className="font-medium">TABESA MUST</p>
            </div>
            <div className="text-center">
              <p className="font-medium">TABESA MUHAS</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {navigationLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-105 ${
                link.active 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 mb-12">
          {socialIcons.map((social, index) => (
            <div
              key={social.name}
              className={`w-14 h-14 rounded-full ${social.bgColor} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer`}
            >
              {social.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white text-center py-4">
        <p className="font-medium">
          Copyright 2025- All Rights Reserved
        </p>
      </div>

      {/* Floating Buttons */}
      <div className="fixed left-6 bottom-6">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>

      <div 
        className="fixed right-6 bottom-6 cursor-pointer"
        onClick={scrollToTop}
      >
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
          <ChevronUp className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;