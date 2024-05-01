import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import guTranslation from './locales/gu/translation.json';

// Configuration for i18next
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,

        resources: {
            en: {
                translation: enTranslation,
            },
            hi: {
                translation: hiTranslation,
            },
            gu: {
                translation: guTranslation,
            },
        },

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n; // Ensure that i18n is exported as the default export
