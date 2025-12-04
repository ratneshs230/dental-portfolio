'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Star, CheckCircle } from 'lucide-react'

const features = [
  'Modern Equipment',
  '16+ Years Experience',
  'Gentle Care',
  'Expert Dentist'
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-radial opacity-50" />

      <div className="dental-container relative">
        <div className="min-h-[80vh] flex items-center py-16 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dental-primary/10 text-dental-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-dental-primary" />
                Trusted by 2,000+ patients
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dental-foreground mb-6 leading-tight">
                Your Smile, <br />
                <span className="text-dental-primary">Our Priority</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Welcome to Advanced Dental Clinic. Experience exceptional dental care
                in Lajpat Nagar with our team of expert dentists.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-dental-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="dental-btn-primary">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a href="tel:+91-11-44928498" className="dental-btn-secondary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-3xl bg-dental-gradient p-1">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🦷</div>
                    <div className="text-2xl font-display font-bold text-dental-foreground">
                      Advanced Dental
                    </div>
                    <div className="text-gray-500">Lajpat Nagar, Delhi</div>
                    <div class="flex items-center justify-center gap-1 mt-4">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span class="font-semibold">4.3</span>
                      <span class="text-gray-500">(70 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
