'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import HeaderComponent from '@/components/navBar'
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
    <div className="container mx-auto overflow-hidden">
      {/* Header Entrance */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
      >
        <HeaderComponent />
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