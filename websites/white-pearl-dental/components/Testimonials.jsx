'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Excellent experience! The staff was very professional and the treatment was painless. Highly recommend!',
    service: 'Root Canal'
  },
  {
    name: 'Rahul M.',
    rating: 5,
    text: 'Best dental clinic in Hauz Khas. Reasonable prices and good results. Will definitely come back!',
    service: 'Teeth Cleaning'
  },
  {
    name: 'Anjali K.',
    rating: 5,
    text: 'Very clean clinic with my kids. The doctor explained everything clearly. Great experience!',
    service: 'Dental Checkup'
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

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
            What Our Patients Say
          </h2>
          <p className="text-gray-600">
            Rated 3.9/5 from 73 reviews
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="dental-card text-center"
            >
              <Quote className="w-12 h-12 text-dental-primary/20 mx-auto mb-6" />

              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="font-bold text-dental-foreground">{testimonials[current].name}</div>
              <div className="text-sm text-gray-500">{testimonials[current].service}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-dental-primary hover:text-white hover:border-dental-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-dental-primary hover:text-white hover:border-dental-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
