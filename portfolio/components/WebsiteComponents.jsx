'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Menu, X, Phone, Clock, Star, MapPin, Award, Users,
  Sparkles, Heart, Stethoscope, Siren, Quote,
  Mail, Calendar, Send, Facebook, Instagram, Twitter
} from 'lucide-react'

// Color utilities
function getColorValue(scheme) {
  const colors = {
    'trust-blue': '#0EA5E9',
    'calm-teal': '#14B8A6',
    'fresh-green': '#22C55E',
    'professional-slate': '#6366F1',
    'warm-coral': '#F97316',
  }
  return colors[scheme] || '#6366F1'
}

function getLightColorValue(scheme) {
  const colors = {
    'trust-blue': '#EFF6FF',
    'calm-teal': '#F0FDFA',
    'fresh-green': '#F0FDF4',
    'professional-slate': '#EEF2FF',
    'warm-coral': '#FFF7ED',
  }
  return colors[scheme] || '#EEF2FF'
}

// Navbar Component
export function Navbar({ clinic, colorScheme, backLink }) {
  const [isOpen, setIsOpen] = useState(false)
  const primaryColor = getColorValue(colorScheme)

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {backLink && (
              <Link href={backLink} className="text-gray-500 hover:text-gray-900">
                ← Back
              </Link>
            )}
            <Link href="#" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                🦷
              </div>
              <span className="font-display font-bold text-gray-900 hidden sm:block">
                {clinic?.name || 'Dental Clinic'}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={`tel:${clinic?.phones?.[0] || ''}`} className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{clinic?.phones?.[0]}</span>
            </a>
            <a
              href="#book"
              className="px-4 py-2 rounded-lg text-white font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Book Now
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="block text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#book" className="block w-full text-center px-4 py-2 rounded-lg text-white font-medium" style={{ backgroundColor: primaryColor }}>
              Book Appointment
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

// Hero Component
export function Hero({ clinic, colorScheme }) {
  const primaryColor = getColorValue(colorScheme)
  const lightColor = getLightColorValue(colorScheme)

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: lightColor }}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: primaryColor, opacity: 0.2 }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: primaryColor, opacity: 0.15 }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {clinic?.googleRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{clinic.googleRating}</span>
                  <span className="text-yellow-600">({clinic.totalReviews} reviews)</span>
                </div>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              {clinic?.name || 'Your Trusted Dental Care'}
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {clinic?.experience
                ? `${clinic.experience}+ years of excellence in dental care. Professional, gentle, and personalized treatment for your entire family.`
                : 'Professional dental care with a gentle touch.'}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {clinic?.experience && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5" style={{ color: primaryColor }} />
                  <span>{clinic.experience}+ Years Experience</span>
                </div>
              )}
              {clinic?.patientBase && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" style={{ color: primaryColor }} />
                  <span>{clinic.patientBase.toLocaleString()}+ Happy Patients</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#book" className="px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105" style={{ backgroundColor: primaryColor }}>
                Book Appointment
              </a>
              <a href={`tel:${clinic?.phones?.[0] || ''}`} className="px-8 py-4 rounded-xl border-2 font-semibold transition-all flex items-center gap-2" style={{ borderColor: primaryColor, color: primaryColor }}>
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>

            {clinic?.address && (
              <div className="mt-8 flex items-start gap-2 text-gray-600">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                <span>{clinic.address}</span>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="w-full aspect-square rounded-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)` }}>
              <div className="text-center text-white p-8">
                <span className="text-9xl">🦷</span>
                <p className="text-xl font-semibold mt-4 opacity-90">Your Smile, Our Priority</p>
              </div>
            </div>
            <motion.div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: lightColor }}>
                  <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Open Today</div>
                  <div className="font-semibold text-gray-900">9:00 AM - 8:00 PM</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Component
export function Services({ clinic, colorScheme }) {
  const primaryColor = getColorValue(colorScheme)
  const services = clinic?.services || { general: [], cosmetic: [], specialized: [] }

  const categories = [
    { title: 'General Dentistry', icon: Stethoscope, items: services.general || [], description: 'Comprehensive care for your dental health' },
    { title: 'Cosmetic Dentistry', icon: Sparkles, items: services.cosmetic || [], description: 'Enhance your smile with cosmetic procedures' },
    { title: 'Specialized Care', icon: Heart, items: services.specialized || [], description: 'Advanced treatments by specialists' },
  ]

  return (
    <section id="services" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Comprehensive Dental Care</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${primaryColor}15` }}>
                <category.icon className="w-7 h-7" style={{ color: primaryColor }} />
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-500 text-sm mb-6">{category.description}</p>
              <ul className="space-y-3">
                {category.items.slice(0, 5).map((service, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
const sampleTestimonials = [
  { name: 'Priya Sharma', text: 'Excellent service! The doctor was very gentle and explained everything clearly.', rating: 5 },
  { name: 'Rajesh Kumar', text: 'Best dental experience I have had. The clinic is clean and staff is friendly.', rating: 5 },
  { name: 'Anita Gupta', text: 'Very professional team. They made me feel comfortable throughout my treatment.', rating: 5 },
]

export function Testimonials({ clinic, colorScheme }) {
  const primaryColor = getColorValue(colorScheme)
  const lightColor = getLightColorValue(colorScheme)

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 md:px-8" style={{ backgroundColor: lightColor }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
            Patient Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          {clinic?.googleRating && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(clinic.googleRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{clinic.googleRating}</span>
              <span className="text-gray-500">({clinic.totalReviews} reviews)</span>
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sampleTestimonials.map((testimonial, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg relative">
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                <Quote className="w-4 h-4 text-white" />
              </div>
              <div className="flex mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: primaryColor }}>
                  {testimonial.name.charAt(0)}
                </div>
                <span className="font-semibold text-gray-900">{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Component
export function Contact({ clinic, colorScheme }) {
  const primaryColor = getColorValue(colorScheme)
  const lightColor = getLightColorValue(colorScheme)

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Contact Us</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-6">
              {clinic?.phones?.[0] && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: lightColor }}>
                    <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href={`tel:${clinic.phones[0]}`} className="text-gray-600 hover:text-gray-900">{clinic.phones[0]}</a>
                  </div>
                </div>
              )}
              {clinic?.address && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: lightColor }}>
                    <MapPin className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">{clinic.address}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: lightColor }}>
                  <Clock className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div id="book" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: lightColor }}>
                  <Calendar className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900">Book Appointment</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you soon</p>
                </div>
              </div>
              <form className="space-y-4">
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="Your name" />
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="Phone number" />
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
                  <option value="">Select a service</option>
                  <option value="checkup">General Checkup</option>
                  <option value="cleaning">Teeth Cleaning</option>
                  <option value="other">Other</option>
                </select>
                <button type="submit" className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: primaryColor }}>
                  <Send className="w-5 h-5" />
                  Request Appointment
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
export function Footer({ clinic, colorScheme }) {
  const primaryColor = getColorValue(colorScheme)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: primaryColor }}>🦷</div>
              <span className="font-display font-bold text-xl">{clinic?.name || 'Dental Clinic'}</span>
            </div>
            <p className="text-gray-400 mb-6">
              {clinic?.experience ? `Providing exceptional dental care for over ${clinic.experience} years.` : 'Quality dental care you can trust.'}
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white">Reviews</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {clinic?.phones?.[0] && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                  <span className="text-gray-400">{clinic.phones[0]}</span>
                </li>
              )}
              {clinic?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                  <span className="text-gray-400">{clinic.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © {currentYear} {clinic?.name || 'Dental Clinic'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
