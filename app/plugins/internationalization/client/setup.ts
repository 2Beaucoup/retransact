import { use } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { Translations } from './locales'

export default use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: Translations,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
