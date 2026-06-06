'use client';

import { useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import BridgingSilenceHero from './_components/description';
import WhyChooseUsAnimated from './_components/why';

export default function ServicesPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <HeaderComponent />
      
      <main className="flex-grow w-full">
        {/* Services Hero Section (handles full-bleed internally) */}
        <BridgingSilenceHero />
        
        {/* Why Choose Us Section (handles full-bleed internally) */}
        <WhyChooseUsAnimated />
        
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