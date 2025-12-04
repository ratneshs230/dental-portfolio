'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/CTASection'

import { QuickBooking } from '@/components/features/QuickBooking'
import { SmileAssessmentCTA } from '@/components/features/SmileAssessmentCTA'

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      <QuickBooking />

      <Services />

      <WhyChooseUs />

      <SmileAssessmentCTA />

      <Testimonials />

      <CTASection />

      
    </div>
  )
}
