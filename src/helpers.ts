import { nl, fr, enUS } from "date-fns/locale";
import { language } from "./i18n";
import { formatDistance } from "date-fns";

export const IS_DEV = process.env.NODE_ENV !== "production";

export const formatLengthDistance = (distance: number) => {
  const rounded = Math.round(distance / 100) * 100;
  return rounded < 1000 ? `${rounded} m` : `${rounded / 1000} km`;
};

export const formatAgo = (date: string) =>
  formatDistance(new Date(date), new Date(), {
    locale: language === "nl" ? nl : language === "fr" ? fr : enUS,
  });
