'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '603, Najafgarh, New Delhi - 11079',
      link: 'https://maps.google.com/?q=603%2C%20Najafgarh%2C%20New%20Delhi%20-%2011079'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-11-46836259',
      link: 'tel:+91-11-46836259'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@clinic.com',
      link: 'mailto:info@clinic.com'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 9AM-8PM',
      link: null
    }
  ]

  return (
    <div className="dental-section">
      <div className="dental-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or ready to schedule an appointment? We're here to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-dental-foreground mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link || '#'}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-dental-primary/10 group-hover:bg-dental-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-dental-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-dental-foreground font-medium group-hover:text-dental-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video rounded-2xl bg-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="dental-card">
              <h2 className="text-2xl font-bold text-dental-foreground mb-6">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-dental-foreground mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      <option value="checkup">General Checkup</option>
                      <option value="cleaning">Teeth Cleaning</option>
                      <option value="whitening">Teeth Whitening</option>
                      <option value="rootcanal">Root Canal</option>
                      <option value="braces">Braces/Aligners</option>
                      <option value="implants">Dental Implants</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your dental needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full dental-btn-primary"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
