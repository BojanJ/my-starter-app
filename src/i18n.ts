import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
// Ensure these paths match your actual locale file structure
import enTranslation from '@/locales/en/translation.json';
import esTranslation from '@/locales/es/translation.json';
import deTranslation from '@/locales/de/translation.json';
// You can add more languages here as needed, e.g.:
// import frTranslation from '@/locales/fr/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
      de: {
        translation: deTranslation,
      },
      // Add more languages here, e.g.:
      // fr: {
      //   translation: frTranslation,
      // },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if a translation is not found
    debug: import.meta.env.DEV, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // react already escapes by default, so we don't need i18next to do it again
    },
    // Optional: ns (namespaces) can be used for larger apps to split translation files
    // defaultNS: 'translation', // This is the default namespace, implied by translation.json
  });

export default i18n;
