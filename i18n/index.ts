import i18n from "i18next";
import nl from "./nl.json";
import fr from "./fr.json";
import en from "./en.json";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      nl: { translation: nl },
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: "nl",
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });
