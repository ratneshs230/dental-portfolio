'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Award, Heart, Users, Sparkles } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: '26+ Years Experience',
    description: 'Trusted expertise built over years of dedicated service'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '5 qualified dentists with specialized training'
  },
  {
    icon: Sparkles,
    title: 'Modern Equipment',
    description: 'State-of-the-art dental technology for precise treatment'
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Flexible scheduling including weekends'
  },
  {
    icon: Heart,
    title: 'Gentle Care',
    description: 'Comfortable, anxiety-free dental experience'
  },
  {
    icon: Shield,
    title: 'Sterilization Standards',
    description: 'Strict hygiene protocols for your safety'
  }
]

export function WhyChooseUs() {
  return (
    <section className="dental-section">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes Dr. Amit Gupta's Dental Clinic the preferred choice for dental care in Rajouri Garden.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-dental-primary/10 flex items-center justify-center">
                <reason.icon className="w-6 h-6 text-dental-primary" />
              </div>
              <div>
                <h3 className="font-bold text-dental-foreground mb-1">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
