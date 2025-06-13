'use client'

import { useRouter } from 'next/navigation'
import HeaderComponent from '@/components/navBar'
import VoiceServicesComponent from './_components/services'
import ProblemSolutionComponent from './_components/description'
import SignMuseumComponent from './_components/videos'
import ProductsShowcase from './_components/products'
import Footer from '@/components/footer'


export default function HomePage() {
  const router = useRouter()
  
  return (
    <div className="container mx-auto">
     <HeaderComponent />
     <VoiceServicesComponent />
     <ProblemSolutionComponent />
     <SignMuseumComponent />
     <ProductsShowcase />
     <Footer />
     {/* Add more components as needed */}
    </div>
  )
}