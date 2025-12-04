import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dental-foreground text-white">
      <div className="dental-container py-16 px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-xl">🦷</span>
              </div>
              <span className="font-display font-bold text-xl">Dr. Neha</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Providing quality dental care in Model Town for over 27 years.
              Your smile is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dental-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">361, Model Town, New Delhi - 11010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dental-primary" />
                <a href="tel:+91-11-48402630" className="text-gray-400 hover:text-white transition-colors">
                  +91-11-48402630
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-dental-primary" />
                <span className="text-gray-400">Mon-Sat: 9AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Dr. Neha Singh's Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
