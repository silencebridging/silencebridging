'use client';

import { useState } from 'react';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import RealTimeTextTranslator from './_components/intro';
import CameraInterface from './_components/camera';
import TranslationOutput from './_components/text';

export default function SignToTextPage() {
  const [translatedText, setTranslatedText] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <HeaderComponent />
      
      <main className="flex-grow w-full">
        {/* Onboarding Intro */}
        <RealTimeTextTranslator />
        
        {/* Camera stream tracking with shared translation state */}
        <CameraInterface 
          translatedText={translatedText}
          setTranslatedText={setTranslatedText}
        />
        
        {/* Text output panel */}
        <TranslationOutput 
          translatedText={translatedText}
          setTranslatedText={setTranslatedText}
        />
        
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
