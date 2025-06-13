'use client'

import { useRouter } from 'next/navigation'
import HeaderComponent from '@/components/navBar'
import SponsorsSection from '@/components/footer1'
import  MissionSection from './_components/intro'
import TeamImpactSection from './_components/team'
//               <span className="text-blue-600">Voices</span>

export default function HomePage() {
  const router = useRouter()
  
  return (
    <div className="container mx-auto">
     <HeaderComponent />
    <MissionSection />
    <TeamImpactSection />
     <SponsorsSection />
     {/* Add more components as needed */}
    </div>
  )
}