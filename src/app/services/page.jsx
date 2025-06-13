'use client'

import { useRouter } from 'next/navigation'
import HeaderComponent from '@/components/navBar'
import SponsorsSection from '@/components/footer1'
import BridgingSilenceHero from './_components/description'
import  WhyChooseUsAnimated from './_components/why'

export default function HomePage() {
  const router = useRouter()
  
  return (
    <div className="container mx-auto">
     <HeaderComponent />
     <BridgingSilenceHero/>
     <WhyChooseUsAnimated />
     {/* You can add more components here as needed */}
     <SponsorsSection />
     {/* Add more components as needed */}
    </div>
  )
}