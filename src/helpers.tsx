import { ShareAltOutlined } from "@ant-design/icons";
import { nl, fr, enUS } from "date-fns/locale";
import { KeyboardEventHandler } from "react";
import { formatDistance } from "date-fns";
import { TStreet, TUser } from "./types";
import { message, Modal } from "antd";
import { language } from "./i18n";
import Share from "./components/Share";
import { TFunction } from "i18next";

export const appName = "Helden in mijn buurt";
export const appDescription =
  "Dit gratis platform brengt mensen die maskers naaien in contact met mensen in de buurt die maskers zoeken. Zo zou iedereen een zelfgenaaid  mondmasker moeten kunnen bekomen.";
export const appUrl = process.env.APP_URL;
export const fullAppUrl = `https://${appUrl}`;

export const contactEmail = "contact@heldeninmijnbuurt.be";

export const grid = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { offset: 2, span: 20 },
  lg: { offset: 4, span: 16 },
  xl: { offset: 6, span: 12 },
};

export const getTrimmedStreetInUserLanguage = (
  street: TStreet | TUser,
  language = "nl"
) => removeParentheses(getStreetInUserLanguage(street, language)).trim();

const getStreetInUserLanguage = (street: TStreet | TUser, language = "nl") => {
  switch (language) {
    case "fr":
      return street.streetDescFr || street.streetDescNl || street.streetDescDe;
    case "de":
      return street.streetDescDe || street.streetDescFr || street.streetDescNl;
    default:
      return street.streetDescNl || street.streetDescFr || street.streetDescDe;
  }
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

export const ellipsis = (text: string, maxChars: number) => {
  const numChars = text.length;
  if (numChars <= maxChars) {
    return text;
  } else {
    const headAndTailLength = Math.floor((maxChars - 1) / 2);
    return (
      text.substring(0, headAndTailLength + 1) +
      "\u2026" +
      text.substring(numChars - headAndTailLength - 1)
    );
  }
};

export const forceMaxLength = (max: number) =>
  ((event) => {
    const selection = (window.getSelection() || "").toString();
    if (
      !selection &&
      event.currentTarget.value.length === max &&
      "0123456789".includes(event.key)
    ) {
      event.preventDefault();
    }
  }) as KeyboardEventHandler<HTMLInputElement>;

export const removeParentheses = (street: string) =>
  street.replace(/ *\([^)]*\) */g, "");

export const getFlemishPostalcodes = (postalCodes: number[]) =>
  postalCodes.filter(
    (pc) => (pc >= 1500 && pc < 4000) || (pc >= 8000 && pc < 10000)
  );

export const share = (t: TFunction, body: string, message?: string) =>
  Modal.info({
    title: "Spread the word...",
    icon: <ShareAltOutlined />,
    content: <Share body={body} message={message} />,
    centered: true,
    maskClosable: true,
    okText: t("close"),
  });
