'use client'

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
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    currentLang === lang.code ? 'bg-dental-primary/5 text-dental-primary' : ''
                  }`}
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
      <span className={`${currentLang === 'en' ? 'font-bold text-dental-primary' : 'text-gray-500'}`}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={`${currentLang === 'hi' ? 'font-bold text-dental-primary' : 'text-gray-500'}`}>हि</span>
    </button>
  )
}
