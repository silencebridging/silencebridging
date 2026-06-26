'use client';

import { useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import MissionSection from './_components/intro';
import TeamImpactSection from './_components/team';
import LibraryImages from './_components/LibraryImages';

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] overflow-hidden relative">
      {/* Decorative background ambient glows for page uniformity */}
      <div className="absolute top-[15%] left-[-15%] w-[50%] aspect-square rounded-full bg-blue-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-15%] w-[50%] aspect-square rounded-full bg-purple-400/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[70%] left-[-15%] w-[50%] aspect-square rounded-full bg-sky-400/10 blur-[120px] pointer-events-none z-0" />

      <HeaderComponent />
      
      <main className="flex-grow w-full z-10">
        {/* Mission and Stats section (handles its own full-bleed and containers internally) */}
        <MissionSection />
        
        {/* Team and Impact section (handles its own full-bleed and containers internally) */}
        <TeamImpactSection />
 
        {/* Cloudinary Library Images component leading to the gallery page */}
        <LibraryImages />
        
        {/* Sponsors section with a transparent container */}
        <div className="w-full bg-transparent py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorsSection />
          </div>
        </div>
      </main>
 
      <Footer />
    </div>
  );
}