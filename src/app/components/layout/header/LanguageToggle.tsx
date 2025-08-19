'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'dr' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex items-center h-8 rounded-full bg-gray-200 dark:bg-gray-700 px-2 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 w-28"
    >
      <div
        className={`absolute w-10 h-6 bg-purple_blue rounded-full shadow-sm transition-transform duration-200 ${
          language === 'en' ? 'translate-x-0' : 'translate-x-14'
        }`}
      />
      <div className="relative z-10 flex items-center justify-between w-full px-3">
        <span
          className={`text-xs font-medium transition-colors duration-200 ${
            language === 'en' 
              ? 'text-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          EN
        </span>
        <span
          className={`text-xs font-medium transition-colors duration-200 ${
            language === 'dr' 
              ? 'text-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          دری
        </span>
      </div>
    </button>
  )
}
