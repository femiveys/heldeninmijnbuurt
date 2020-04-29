import { message } from "antd";
import { language } from "./i18n";
import { nl, fr, enUS } from "date-fns/locale";
import { formatDistance } from "date-fns";

export const IS_DEV = process.env.NODE_ENV !== "production";

export const grid = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { offset: 2, span: 20 },
  lg: { offset: 4, span: 16 },
  xl: { offset: 6, span: 12 },
  // style: { backgroundColor: "yellow" },
};

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
