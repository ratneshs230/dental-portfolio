'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Users,
  Calendar,
  Heart,
  CheckCircle,
  Building
} from 'lucide-react'
import clinicData from '@/data/clinic.json'

const stats = [
  { icon: Calendar, label: 'Years Experience', value: '6+' },
  { icon: Users, label: 'Happy Patients', value: '2K+' },
  { icon: Award, label: 'Dentists', value: '5' },
  { icon: Heart, label: 'Treatments Done', value: '1704+' },
]

export default function AboutPage() {
  return (
    <div className="dental-section">
      <div className="dental-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            About Dr. Agarwal's Dental Clinic
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing exceptional dental care to Ashok Vihar since 2009.
            Your smile is our passion.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="dental-card text-center">
              <stat.icon className="w-10 h-10 text-dental-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-dental-foreground mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-display font-bold text-dental-foreground mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Dr. Agarwal's Dental Clinic was established with a simple mission: to provide
              world-class dental care in a warm, welcoming environment. Located in the
              heart of Ashok Vihar, we've been serving families for over
              6 years.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of 5 experienced dentists and
              2 support staff are committed to making every visit comfortable
              and stress-free.
            </p>
            <ul className="space-y-3">
              {clinicInfo.qualifications.slice(0, 4).map((qual, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-dental-primary" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-dental-gradient opacity-10 absolute inset-0" />
            <div className="relative dental-card">
              <Building className="w-16 h-16 text-dental-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Our Facility</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Modern 6-chair dental setup</li>
                <li>• Autoclave sterilization</li>
                <li>• Digital X-ray facility</li>
                <li>• Comfortable waiting area</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
