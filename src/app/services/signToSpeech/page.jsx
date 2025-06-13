'use client'

import { useRouter } from 'next/navigation'
import HeaderComponent from '@/components/navBar'
import SponsorsSection from '@/components/footer1'
import RealTimeTranslator from './_components/intro'
import  CameraInterface from './_components/camera'
import TranslationOutput from './_components/text'

export default function HomePage() {
  const router = useRouter()
  
  return (
    <div className="container mx-auto">
     <HeaderComponent />
    <RealTimeTranslator />
    <CameraInterface />
    <TranslationOutput />
     {/* Add more components as needed */}
     <SponsorsSection />
     {/* Add more components as needed */}
    </div>
  )
}