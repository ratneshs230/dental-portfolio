'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  Sparkles,
  Shield,
  ArrowRight,
  Phone
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    "name": "Dental Checkup",
    "category": "General"
  },
  {
    "name": "Teeth Cleaning",
    "category": "General"
  },
  {
    "name": "Cavity Filling",
    "category": "General"
  },
  {
    "name": "Tooth Extraction",
    "category": "General"
  },
  {
    "name": "Root Canal Treatment",
    "category": "General"
  },
  {
    "name": "Smile Makeover",
    "category": "Cosmetic"
  },
  {
    "name": "Dental Bonding",
    "category": "Cosmetic"
  },
  {
    "name": "Gum Contouring",
    "category": "Cosmetic"
  },
  {
    "name": "Teeth Whitening",
    "category": "Cosmetic"
  },
  {
    "name": "TMJ Treatment",
    "category": "Specialized"
  },
  {
    "name": "Sleep Apnea Treatment",
    "category": "Specialized"
  },
  {
    "name": "Oral Surgery",
    "category": "Specialized"
  }
]

const categories = [
  { name: 'General', icon: Stethoscope, description: 'Essential dental care for the whole family' },
  { name: 'Cosmetic', icon: Sparkles, description: 'Enhance your smile with our cosmetic treatments' },
  { name: 'Specialized', icon: Shield, description: 'Advanced treatments for complex dental needs' },
]

export default function ServicesPage() {
  return (
    <div className="dental-section">
      <div className="dental-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive dental care tailored to your needs. From routine checkups to
            advanced treatments, we've got you covered.
          </p>
        </motion.div>

        {/* Service Categories */}
        {categories.map((category, catIndex) => {
          const categoryServices = services.filter(s => s.category === category.name)
          if (categoryServices.length === 0) return null

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-dental-primary/10">
                  <category.icon className="w-8 h-8 text-dental-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dental-foreground">{category.name} Dentistry</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="dental-card group cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-dental-foreground mb-2 group-hover:text-dental-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Professional {service.name.toLowerCase()} services with modern techniques and equipment.
                    </p>
                    <div className="flex items-center text-dental-primary text-sm font-medium">
                      Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-dental-gradient rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Book your consultation today and take the first step towards a healthier smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="dental-btn-secondary bg-white">
              Book Appointment
            </Link>
            <a href="tel:+91-11-40135275" className="dental-btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-dental-primary">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
