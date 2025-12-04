'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Calendar, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="dental-section">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-dental-gradient p-12 md:p-16 text-white text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready for Your Best Smile?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the difference at Dr. Mittal's Dental Studio.
              Consultation starts at just ₹300.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-dental-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
              <a
                href="tel:+91-11-27595323"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                +91-11-27595323
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
