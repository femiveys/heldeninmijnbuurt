import { message } from "antd";
import { language } from "./i18n";
import { nl, fr, enUS } from "date-fns/locale";
import { formatDistance } from "date-fns";

export const IS_DEV = process.env.NODE_ENV !== "production";

export const formatLengthDistance = (distance: number) => {
  return distance < 1000
    ? `${Math.round(distance / 10) * 10} m`
    : `${(Math.round(distance / 100) * 100) / 1000} km`;
};

export const formatAgo = (date: string) =>
  formatDistance(new Date(date), new Date(), {
    locale: language === "nl" ? nl : language === "fr" ? fr : enUS,
  });

export const notImplemented = (description?: string) => {
  message.warning(
    description
      ? `${description} is nog niet geimplementeerd`
      : "Nog niet geïplementeerd"
  );
};
