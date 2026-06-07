'use client';

import React, { useState, useEffect } from 'react';
import { Home, Headphones, Search, ShoppingBag, Menu, X, Mail, Phone } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const HeaderComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg'];

  // Auto-play background slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden rounded-b-[2rem] shadow-xl">
      {/* Background Slider Images */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentImage === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

      {/* Dim/Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />



      {/* FLOATING HEADER AREA */}
      <div className="absolute inset-x-0 top-0 z-30 flex flex-col items-center p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto gap-4">
        
        {/* Layer 1: White Contact & Logo Bar */}
        <div className="w-full bg-white rounded-2xl md:rounded-3xl shadow-xl px-4 md:px-8 lg:px-12 py-3 md:py-4 flex items-center justify-between transition-all">
          {/* Brand Logo */}
          <a href="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex items-center justify-center shadow-md">
              <img src="/bridgingsilenceicon.jpeg" alt="Bridging Silence Logo" className="w-full h-full object-cover" />
            </div>
          </a>
          
          {/* Contact Details (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-xs md:text-sm text-left leading-tight font-semibold">
                <p className="text-gray-800 font-extrabold">Phone: <span className="text-gray-600 font-medium">+255 675 546 576</span></p>
                <p className="text-gray-800 font-extrabold">Email: <span className="text-gray-600 font-medium">bridgingsilence@gmail.com</span></p>
              </div>
            </div>
          </div>
          
          {/* Contact Details (Mobile Toggle) */}
          <div className="flex md:hidden items-center space-x-3">
            <a href="tel:+255675546576" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:bridgingsilence@gmail.com" className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={() => router.push('/services/signToSpeech')}
            className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-full transition-all shadow-md shadow-sky-500/25 flex items-center gap-1.5"
          >
            Get Started
          </button>
        </div>

        {/* Layer 2: Floating Blue Navigation Card */}
        <div className="w-full max-w-4xl bg-blue-600 rounded-2xl md:rounded-[2rem] shadow-xl px-5 md:px-8 py-3 md:py-4 flex items-center justify-between border border-blue-500/20 backdrop-blur-sm">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-white text-[13px] lg:text-sm font-extrabold tracking-wide">
            <a href="/" className="relative flex items-center py-1 group">
              <Home className="w-4 h-4" />
              <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a href="/about" className="relative py-1 group hover:text-blue-100 transition-colors">
              About Us
              <span className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transition-transform origin-left ${pathname === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
            <a href="/services" className="relative py-1 group hover:text-blue-100 transition-colors">
              Services
              <span className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transition-transform origin-left ${pathname === '/services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
            <a href="/faq" className="relative py-1 group hover:text-blue-100 transition-colors">
              FAQ's
              <span className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transition-transform origin-left ${pathname === '/faq' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
            <a href="/blog" className="relative py-1 group hover:text-blue-100 transition-colors">
              Blog
              <span className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transition-transform origin-left ${pathname === '/blog' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
            <a href="/contact" className="relative py-1 group hover:text-blue-100 transition-colors">
              Contact Us
              <span className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-white transition-transform origin-left ${pathname === '/contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </a>
          </nav>
          
          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Icons and Dividers */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="text-white hover:text-blue-100 transition-colors p-1">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <div className="h-5 w-[1px] bg-white/25 hidden md:block" />
            <button className="text-white hover:text-blue-100 transition-colors p-1">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="w-full max-w-4xl bg-blue-700/95 backdrop-blur-md rounded-2xl shadow-xl mt-1 overflow-hidden md:hidden border border-blue-600/30 animate-fadeIn">
            <nav className="flex flex-col p-4 text-white text-sm font-extrabold tracking-wide divide-y divide-blue-600/50">
              <a href="/" className="py-3 px-2 flex items-center gap-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                <Home className="w-4 h-4" /> Home
              </a>
              <a href="/about" className="py-3 px-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                About Us
              </a>
              <a href="/services" className="py-3 px-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                Services
              </a>
              <a href="/faq" className="py-3 px-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                FAQ's
              </a>
              <a href="/blog" className="py-3 px-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                Blog
              </a>
              <a href="/contact" className="py-3 px-2 hover:bg-blue-800/50 rounded-lg transition-colors">
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Hero Center Text Banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none mt-16 md:mt-24">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg tracking-tight leading-tight max-w-4xl animate-slideUp">
          Bridging Silence
        </h1>
        <p className="text-xs sm:text-sm md:text-lg text-white/95 mt-3 max-w-xl font-bold tracking-widest uppercase drop-shadow-md animate-slideUp">
          Connecting Communities Through Communication
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentImage === idx ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
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

export default HeaderComponent;