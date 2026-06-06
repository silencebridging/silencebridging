'use client';

import { useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import MissionSection from './_components/intro';
import TeamImpactSection from './_components/team';

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <HeaderComponent />
      
      <main className="flex-grow w-full">
        {/* Mission and Stats section (handles its own full-bleed and containers internally) */}
        <MissionSection />
        
        {/* Team and Impact section (handles its own full-bleed and containers internally) */}
        <TeamImpactSection />
        
        {/* Sponsors section with a full-width container */}
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