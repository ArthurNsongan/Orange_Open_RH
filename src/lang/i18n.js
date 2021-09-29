import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import {Language} from './Language';
import translationFR from './fr.json';
import translationEN from './en.json';

let defaultLanguage = Language.FR;
let currentLanguage = localStorage.getItem("i18nextLng");
let actualLanguage = ( currentLanguage === "" || currentLanguage == null ) ? defaultLanguage : currentLanguage;

// alert("actualLanguage : " + actualLanguage);

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: actualLanguage,
        keySeparator: '.',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;