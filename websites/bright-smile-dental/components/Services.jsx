'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    "name": "Dental Checkup",
    "icon": "🦷"
  },
  {
    "name": "Teeth Cleaning",
    "icon": "🦷"
  },
  {
    "name": "Cavity Filling",
    "icon": "🦷"
  },
  {
    "name": "Gum Contouring",
    "icon": "🦷"
  },
  {
    "name": "Teeth Whitening",
    "icon": "🦷"
  },
  {
    "name": "Sleep Apnea Treatment",
    "icon": "🦷"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Services() {
  return (
    <section className="dental-section bg-gray-50">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-foreground mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive dental care for the whole family. From routine checkups to specialized treatments.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="dental-card group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-dental-foreground mb-2 group-hover:text-dental-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                Professional {service.name.toLowerCase()} services using modern techniques.
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/services" className="dental-btn-primary">
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
