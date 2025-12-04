/**
 * Multi-Language Support Feature
 */

import fs from 'fs-extra';
import path from 'path';

export class MultiLanguageFeature {
  async integrate(outputPath, clinicInfo) {
    const libDir = path.join(outputPath, 'lib');
    const localesDir = path.join(outputPath, 'locales');
    const componentsDir = path.join(outputPath, 'components', 'features');

    await fs.ensureDir(libDir);
    await fs.ensureDir(localesDir);
    await fs.ensureDir(componentsDir);

    // i18n Library
    await fs.writeFile(path.join(libDir, 'i18n.js'), `/**
 * Internationalization (i18n) Library
 */

import en from '@/locales/en.json'
import hi from '@/locales/hi.json'

const translations = { en, hi }

// Get browser language
export function getBrowserLanguage() {
  if (typeof window === 'undefined') return 'en'

  const lang = navigator.language || navigator.userLanguage
  return lang.startsWith('hi') ? 'hi' : 'en'
}

// Get stored language preference
export function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en'

  return localStorage.getItem('preferred-language') || getBrowserLanguage()
}

// Set language preference
export function setStoredLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang)
  }
}

// Translate function
export function t(key, lang = 'en') {
  const keys = key.split('.')
  let value = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

// Create translation hook
export function createTranslator(lang) {
  return (key) => t(key, lang)
}

export default {
  getBrowserLanguage,
  getStoredLanguage,
  setStoredLanguage,
  t,
  createTranslator
}
`);

    // English Translations
    await fs.writeFile(path.join(localesDir, 'en.json'), `{
  "common": {
    "bookAppointment": "Book Appointment",
    "callNow": "Call Now",
    "learnMore": "Learn More",
    "viewAll": "View All",
    "submit": "Submit",
    "cancel": "Cancel",
    "back": "Back",
    "next": "Next",
    "close": "Close",
    "loading": "Loading...",
    "success": "Success",
    "error": "Error"
  },
  "nav": {
    "home": "Home",
    "about": "About Us",
    "services": "Services",
    "contact": "Contact",
    "bookNow": "Book Now"
  },
  "hero": {
    "title": "Your Smile, Our Priority",
    "subtitle": "Welcome to ${clinicInfo.name}. Experience exceptional dental care in ${clinicInfo.area} with our team of expert dentists.",
    "cta": "Book Your Appointment",
    "trusted": "Trusted by 5,000+ patients"
  },
  "services": {
    "title": "Our Services",
    "subtitle": "Comprehensive dental care for the whole family",
    "checkup": "Dental Checkup",
    "cleaning": "Teeth Cleaning",
    "whitening": "Teeth Whitening",
    "rootCanal": "Root Canal",
    "extraction": "Tooth Extraction",
    "filling": "Cavity Filling",
    "implants": "Dental Implants",
    "braces": "Braces & Aligners"
  },
  "about": {
    "title": "About ${clinicInfo.name}",
    "subtitle": "Providing quality dental care since ${clinicInfo.established || 2000}",
    "experience": "Years Experience",
    "patients": "Happy Patients",
    "dentists": "Expert Dentists",
    "treatments": "Treatments Done"
  },
  "contact": {
    "title": "Contact Us",
    "subtitle": "Get in touch with us",
    "name": "Full Name",
    "phone": "Phone Number",
    "email": "Email Address",
    "message": "Your Message",
    "send": "Send Message",
    "address": "Address",
    "hours": "Working Hours",
    "hoursValue": "Mon-Sat: 9AM-8PM"
  },
  "appointment": {
    "title": "Book Appointment",
    "selectService": "Select Service",
    "selectDate": "Select Date",
    "selectTime": "Select Time",
    "yourDetails": "Your Details",
    "confirm": "Confirm Booking",
    "confirmed": "Booking Confirmed!",
    "confirmMessage": "Your appointment has been scheduled"
  },
  "testimonials": {
    "title": "What Our Patients Say",
    "subtitle": "Read reviews from our satisfied patients"
  },
  "footer": {
    "about": "About Us",
    "quickLinks": "Quick Links",
    "contact": "Contact Us",
    "copyright": "All rights reserved"
  }
}`);

    // Hindi Translations
    await fs.writeFile(path.join(localesDir, 'hi.json'), `{
  "common": {
    "bookAppointment": "अपॉइंटमेंट बुक करें",
    "callNow": "अभी कॉल करें",
    "learnMore": "और जानें",
    "viewAll": "सभी देखें",
    "submit": "जमा करें",
    "cancel": "रद्द करें",
    "back": "वापस",
    "next": "आगे",
    "close": "बंद करें",
    "loading": "लोड हो रहा है...",
    "success": "सफलता",
    "error": "त्रुटि"
  },
  "nav": {
    "home": "होम",
    "about": "हमारे बारे में",
    "services": "सेवाएं",
    "contact": "संपर्क",
    "bookNow": "अभी बुक करें"
  },
  "hero": {
    "title": "आपकी मुस्कान, हमारी प्राथमिकता",
    "subtitle": "${clinicInfo.name} में आपका स्वागत है। ${clinicInfo.area} में हमारे विशेषज्ञ दंत चिकित्सकों की टीम के साथ असाधारण दंत चिकित्सा का अनुभव करें।",
    "cta": "अपॉइंटमेंट बुक करें",
    "trusted": "5,000+ मरीजों द्वारा विश्वसनीय"
  },
  "services": {
    "title": "हमारी सेवाएं",
    "subtitle": "पूरे परिवार के लिए व्यापक दंत चिकित्सा",
    "checkup": "दंत जांच",
    "cleaning": "दांतों की सफाई",
    "whitening": "दांतों को सफेद करना",
    "rootCanal": "रूट कैनाल",
    "extraction": "दांत निकालना",
    "filling": "कैविटी फिलिंग",
    "implants": "डेंटल इम्प्लांट",
    "braces": "ब्रेसेस और एलाइनर"
  },
  "about": {
    "title": "${clinicInfo.name} के बारे में",
    "subtitle": "${clinicInfo.established || 2000} से गुणवत्तापूर्ण दंत चिकित्सा प्रदान कर रहे हैं",
    "experience": "वर्षों का अनुभव",
    "patients": "खुश मरीज",
    "dentists": "विशेषज्ञ दंत चिकित्सक",
    "treatments": "उपचार किए गए"
  },
  "contact": {
    "title": "संपर्क करें",
    "subtitle": "हमसे संपर्क करें",
    "name": "पूरा नाम",
    "phone": "फोन नंबर",
    "email": "ईमेल पता",
    "message": "आपका संदेश",
    "send": "संदेश भेजें",
    "address": "पता",
    "hours": "कार्य समय",
    "hoursValue": "सोम-शनि: सुबह 9 - रात 8"
  },
  "appointment": {
    "title": "अपॉइंटमेंट बुक करें",
    "selectService": "सेवा चुनें",
    "selectDate": "तारीख चुनें",
    "selectTime": "समय चुनें",
    "yourDetails": "आपका विवरण",
    "confirm": "बुकिंग की पुष्टि करें",
    "confirmed": "बुकिंग की पुष्टि!",
    "confirmMessage": "आपकी अपॉइंटमेंट निर्धारित कर दी गई है"
  },
  "testimonials": {
    "title": "हमारे मरीज क्या कहते हैं",
    "subtitle": "हमारे संतुष्ट मरीजों की समीक्षाएं पढ़ें"
  },
  "footer": {
    "about": "हमारे बारे में",
    "quickLinks": "त्वरित लिंक",
    "contact": "संपर्क करें",
    "copyright": "सर्वाधिकार सुरक्षित"
  }
}`);

    // Language Switcher Component
    await fs.writeFile(path.join(componentsDir, 'LanguageSwitcher.jsx'), `'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { getStoredLanguage, setStoredLanguage } from '@/lib/i18n'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' }
]

export function LanguageSwitcher({ onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    setCurrentLang(getStoredLanguage())
  }, [])

  const handleChange = (langCode) => {
    setCurrentLang(langCode)
    setStoredLanguage(langCode)
    setIsOpen(false)
    if (onChange) onChange(langCode)
    // Optionally reload page or update context
    window.location.reload()
  }

  const current = languages.find(l => l.code === currentLang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium">{current?.flag} {current?.nativeName}</span>
        <ChevronDown className={\`w-4 h-4 text-gray-400 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className={\`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors \${
                    currentLang === lang.code ? 'bg-dental-primary/5 text-dental-primary' : ''
                  }\`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-gray-500">{lang.name}</div>
                  </div>
                  {currentLang === lang.code && (
                    <span className="ml-auto text-dental-primary">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Simple Toggle Switcher
export function LanguageToggle({ onChange }) {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    setCurrentLang(getStoredLanguage())
  }, [])

  const toggle = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en'
    setCurrentLang(newLang)
    setStoredLanguage(newLang)
    if (onChange) onChange(newLang)
    window.location.reload()
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
    >
      <span className={\`\${currentLang === 'en' ? 'font-bold text-dental-primary' : 'text-gray-500'}\`}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={\`\${currentLang === 'hi' ? 'font-bold text-dental-primary' : 'text-gray-500'}\`}>हि</span>
    </button>
  )
}
`);

    // Translation Context Provider
    await fs.writeFile(path.join(libDir, 'TranslationContext.jsx'), `'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getStoredLanguage, setStoredLanguage, t } from './i18n'

const TranslationContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key
})

export function TranslationProvider({ children }) {
  const [language, setLanguageState] = useState('en')

  useEffect(() => {
    setLanguageState(getStoredLanguage())
  }, [])

  const setLanguage = (lang) => {
    setLanguageState(lang)
    setStoredLanguage(lang)
  }

  const translate = (key) => t(key, language)

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}

export default TranslationContext
`);
  }
}

export default MultiLanguageFeature;
