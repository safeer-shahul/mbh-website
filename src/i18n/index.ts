"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      lng: "en", // temporary default
      fallbackLng: "en",
      resources: {
        en: { translation: en },
        ar: { translation: ar },
      },
      interpolation: { escapeValue: false },
    });
}

export default i18n;
