import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { formatAgo } from "../helpers";
import nl from "./nl.json";
import fr from "./fr.json";
import en from "./en.json";

export const language = "nl";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV !== "production",
    resources: {
      nl: { translation: nl },
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: language,
    fallbackLng: "en",
    interpolation: {
      format: (value, format, lng) => {
        if (format === "ago") return formatAgo(value);
        return value;
      },
      escapeValue: false,
    },
  });
