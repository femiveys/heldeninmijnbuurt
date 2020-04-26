import { nl, fr, enUS } from "date-fns/locale";
import { TFunction } from "i18next";
import { message } from "antd";
import { apiCall } from "./axios";
import { language } from "./i18n";
import { SentMessageInfo } from "./types";
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

export const sendAppMail = async (
  relationId: number,
  mailId: string,
  t: TFunction
) => {
  try {
    const info: SentMessageInfo = await apiCall("POST", `mail/${relationId}`, {
      mailId,
    });

    if (info) {
      if (IS_DEV) {
        message.info(
          `In DEV we don't send real mails. Message "${mailId}" would have been sent to relation: "${relationId}"`
        );
      }
      return info;
    } else {
      throw new Error("An empty info object was returned");
    }
  } catch (error) {
    message.error(t("error.mail"));
  }
};
