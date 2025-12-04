/**
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
