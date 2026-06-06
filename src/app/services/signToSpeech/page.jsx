'use client';

import { useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import RealTimeTranslator from './_components/intro';
import CameraInterface from './_components/camera';
import TranslationOutput from './_components/text';

export default function SignToSpeechPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <HeaderComponent />
      
      <main className="flex-grow w-full">
        {/* Onboarding Intro (handles containers internally) */}
        <RealTimeTranslator />
        
        {/* Camera stream tracking (handles containers internally) */}
        <CameraInterface />
        
        {/* Speech output text (handles containers internally) */}
        <TranslationOutput />
        
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