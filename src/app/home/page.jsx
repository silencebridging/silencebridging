'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import HeaderComponent from '@/components/navBar'
import PromoBannerComponent from './_components/promoBanner'
import VoiceServicesComponent from './_components/services'
import ProblemSolutionComponent from './_components/description'
import SignMuseumComponent from './_components/videos'
import ProductsShowcase from './_components/products'
import Footer from '@/components/footer'

export default function HomePage() {
  const router = useRouter()
  
  // Custom ease transition curve (smooth out-quart)
  const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] overflow-hidden relative">
      {/* Decorative background ambient glows for page uniformity */}
      <div className="absolute top-[15%] left-[-15%] w-[50%] aspect-square rounded-full bg-blue-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-15%] w-[50%] aspect-square rounded-full bg-purple-400/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[65%] left-[-15%] w-[50%] aspect-square rounded-full bg-sky-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[85%] right-[-15%] w-[40%] aspect-square rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none z-0" />

      {/* Header Entrance */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
      >
        <HeaderComponent />
      </motion.div>

      {/* Promo Banner Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...smoothTransition, delay: 0.1 }}
      >
        <PromoBannerComponent />
      </motion.div>

      {/* Voice Services Section Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={smoothTransition}
      >
        <VoiceServicesComponent />
      </motion.div>

      {/* Problem & Solution Section Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={smoothTransition}
      >
        <ProblemSolutionComponent />
      </motion.div>

      {/* Sign Museum Videos Section Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={smoothTransition}
      >
        <SignMuseumComponent />
      </motion.div>

      {/* Products Showcase Section Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={smoothTransition}
      >
        <ProductsShowcase />
      </motion.div>

      {/* Footer Section Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}