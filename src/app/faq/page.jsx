'use client';

import React, { useState } from 'react';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does the Sign-to-Sauti translation work?",
      answer: "Our tool uses advanced hand-tracking technology (powered by MediaPipe) to detect coordinates of 21 key landmarks on your hand. These coordinates are sent to our AI model, which processes hand gestures in real-time, instantly converting letters and signs into Swahili text and spoken audio."
    },
    {
      question: "Which sign languages are supported by Bridging Silence?",
      answer: "We focus on Tanzanian Sign Language (TSL) and Kenya Sign Language (KSL) variations, including standard Swahili interpretation. We are expanding to support over 100+ sign languages and slang variations globally."
    },
    {
      question: "Can I use the translation tool on mobile devices?",
      answer: "Yes! Our platform is fully responsive and optimized for mobile browser use. You can access the camera interface directly from your smartphone or tablet (using either your front or back camera) via HTTPS."
    },
    {
      question: "How accurate is the real-time AI recognition?",
      answer: "Currently, our core sign-tech model achieved a 98% translation accuracy in stable lighting environments. Holding your hand steady in frame for 500ms allows the system to analyze gestures accurately."
    },
    {
      question: "Is there a custom training mode to learn signing?",
      answer: "Yes, our training mode allows users to practice signing letters. The platform provides visual and audio feedback, giving you step-by-step guidance on finger placement to improve your signing accuracy."
    },
    {
      question: "Is the translation API open for developer integration?",
      answer: "Yes! We are planning to release our API endpoint for developers to embed real-time sign language interpretation into third-party communication, educational, and public service apps."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <HeaderComponent />
      
      <main className="flex-grow w-full relative">
        
        {/* Slanted decoration cylinders top right */}
        <div className="absolute top-[5%] right-[-40px] pointer-events-none z-0 hidden lg:block">
          <div className="relative w-48 h-36">
            <div className="absolute top-[-10px] right-[40px] w-10 h-36 bg-sky-400 rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
            <div className="absolute top-[-10px] right-0 w-10 h-36 bg-[#8b5cf6] rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
          </div>
        </div>

        {/* Hero title banner */}
        <div className="bg-gray-50 py-16 sm:py-20 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Frequently Asked <span className="text-[#1b64da]">Questions</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
              Find instant answers to common questions about our real-time AI sign language translation, supported gestures, and api options.
            </p>
            
            {/* Search Box */}
            <div className="max-w-md mx-auto mt-8 relative">
              <input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1b64da] focus:border-transparent transition-all"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="py-16 container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-[#1b64da]' : 'text-gray-400'}`} />
                        <span className="font-bold text-gray-800 text-sm sm:text-base leading-snug">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-[#1b64da]' : ''}`} />
                    </button>
                    
                    {/* Collapsible Answer */}
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 font-bold">No questions match your search query.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-xs font-bold text-[#1b64da] hover:underline uppercase"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Shared Sponsors Section */}
        <div className="w-full bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorsSection />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
