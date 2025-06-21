'use client'

import { useRouter } from 'next/navigation'
import HeaderComponent from '@/components/navBar'
import SponsorsSection from '@/components/footer1'
import MissionSection from './_components/intro'
import TeamImpactSection from './_components/team'

export default function AboutPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderComponent />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-6 sm:py-10 md:py-12">
            <MissionSection />
          </section>
          
          <section className="py-6 sm:py-10 md:py-12">
            <TeamImpactSection />
          </section>
          
          <section className="py-6 sm:py-10 md:py-12">
            <SponsorsSection />
          </section>
          
          {/* Add more components as needed */}
        </div>
      </main>
    </div>
  )
}