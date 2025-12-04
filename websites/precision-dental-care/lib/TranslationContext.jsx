'use client'

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
