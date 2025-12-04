/**
 * Online Appointment & Scheduling Feature
 */

import fs from 'fs-extra';
import path from 'path';

export class AppointmentBookingFeature {
  async integrate(outputPath, clinicInfo) {
    const featuresDir = path.join(outputPath, 'components', 'features');
    const libDir = path.join(outputPath, 'lib');
    const appDir = path.join(outputPath, 'app', 'book-appointment');

    await fs.ensureDir(featuresDir);
    await fs.ensureDir(libDir);
    await fs.ensureDir(appDir);

    // Main Appointment Booking Component
    await fs.writeFile(path.join(featuresDir, 'AppointmentBooking.jsx'), `'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Phone, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { format, addDays, isSameDay } from 'date-fns'

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
]

const services = [
  { id: 'checkup', name: 'Dental Checkup', duration: '30 min', price: '${clinicInfo.consultationFee || '₹500'}' },
  { id: 'cleaning', name: 'Teeth Cleaning', duration: '45 min', price: '₹1,500' },
  { id: 'whitening', name: 'Teeth Whitening', duration: '60 min', price: '₹5,000' },
  { id: 'rootcanal', name: 'Root Canal', duration: '90 min', price: '₹8,000' },
  { id: 'extraction', name: 'Tooth Extraction', duration: '45 min', price: '₹2,000' },
  { id: 'filling', name: 'Cavity Filling', duration: '45 min', price: '₹1,500' }
]

export function AppointmentBooking({ onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: null,
    date: null,
    time: null,
    name: '',
    phone: '',
    email: '',
    notes: ''
  })

  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1))

  const handleSubmit = async () => {
    // In production, this would send to backend
    console.log('Booking submitted:', formData)
    setStep(4)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-dental-gradient p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Book Appointment</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={\`h-2 flex-1 rounded-full \${step >= s ? 'bg-white' : 'bg-white/30'}\`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-dental-foreground mb-4">Select Service</h3>
                <div className="grid gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setFormData({ ...formData, service })
                        setStep(2)
                      }}
                      className={\`p-4 rounded-xl border-2 text-left transition-all \${
                        formData.service?.id === service.id
                          ? 'border-dental-primary bg-dental-primary/5'
                          : 'border-gray-200 hover:border-dental-primary/50'
                      }\`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-dental-foreground">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                        <div className="text-dental-primary font-bold">{service.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-dental-foreground mb-4">Select Date & Time</h3>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Choose Date</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {dates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => setFormData({ ...formData, date })}
                        className={\`shrink-0 p-3 rounded-xl border-2 text-center min-w-[80px] transition-all \${
                          formData.date && isSameDay(formData.date, date)
                            ? 'border-dental-primary bg-dental-primary text-white'
                            : 'border-gray-200 hover:border-dental-primary/50'
                        }\`}
                      >
                        <div className="text-xs uppercase">{format(date, 'EEE')}</div>
                        <div className="text-lg font-bold">{format(date, 'd')}</div>
                        <div className="text-xs">{format(date, 'MMM')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={\`p-2 rounded-lg border-2 text-sm transition-all \${
                            formData.time === time
                              ? 'border-dental-primary bg-dental-primary text-white'
                              : 'border-gray-200 hover:border-dental-primary/50'
                          }\`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 dental-btn-secondary"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.date || !formData.time}
                    className="flex-1 dental-btn-primary disabled:opacity-50"
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-lg font-bold text-dental-foreground mb-4">Your Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none resize-none"
                      rows={3}
                      placeholder="Any specific concerns or requirements..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 dental-btn-secondary">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.phone}
                    className="flex-1 dental-btn-primary disabled:opacity-50"
                  >
                    Confirm Booking
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-dental-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6">
                  Your appointment has been scheduled for {formData.date && format(formData.date, 'EEEE, MMMM d')} at {formData.time}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Service</div>
                      <div className="font-semibold">{formData.service?.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Duration</div>
                      <div className="font-semibold">{formData.service?.duration}</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  A confirmation SMS has been sent to {formData.phone}
                </p>

                <button onClick={onClose} className="dental-btn-primary mt-6">
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

// Quick Booking Widget for Homepage
export function QuickBooking() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <section className="dental-section bg-dental-primary/5 -mt-8 relative z-10">
        <div className="dental-container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-dental-primary/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-dental-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dental-foreground">Book Your Appointment</h3>
                  <p className="text-gray-600">Easy online scheduling • Instant confirmation</p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="dental-btn-primary whitespace-nowrap"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && <AppointmentBooking onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}
`);

    // Appointments Library
    await fs.writeFile(path.join(libDir, 'appointments.js'), `/**
 * Appointments Management Library
 */

export const appointmentService = {
  // Get available slots for a given date
  async getAvailableSlots(date) {
    // In production, this would fetch from backend
    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
      '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
    ]

    // Simulate some slots being booked
    const bookedSlots = ['10:00 AM', '02:30 PM', '04:00 PM']
    return allSlots.filter(slot => !bookedSlots.includes(slot))
  },

  // Book appointment
  async bookAppointment(data) {
    // In production, this would send to backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          bookingId: 'BK' + Date.now(),
          ...data
        })
      }, 1000)
    })
  },

  // Cancel appointment
  async cancelAppointment(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  },

  // Reschedule appointment
  async rescheduleAppointment(bookingId, newDate, newTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          newDate,
          newTime
        })
      }, 500)
    })
  }
}

export default appointmentService
`);

    // Booking Page
    await fs.writeFile(path.join(appDir, 'page.jsx'), `'use client'

import { useState } from 'react'
import { AppointmentBooking } from '@/components/features/AppointmentBooking'

export default function BookAppointmentPage() {
  return (
    <div className="dental-section">
      <div className="dental-container px-4">
        <AppointmentBooking onClose={() => window.history.back()} />
      </div>
    </div>
  )
}
`);
  }
}

export default AppointmentBookingFeature;
