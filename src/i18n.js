import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        call: "Call Contact",
        share: "Share Location",
        emergency: "Emergency Mode"
      }
    },
    hi: {
      translation: {
        call: "कॉल करें",
        share: "लोकेशन भेजें",
        emergency: "आपातकाल"
      }
    }
  },
  lng: "en", // default
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;