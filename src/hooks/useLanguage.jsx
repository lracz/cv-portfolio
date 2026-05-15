import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../data/translations.js'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations.en?.[key] || key
  }, [lang])

  const toggleLang = () => {
    const next = lang === 'en' ? 'hu' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
