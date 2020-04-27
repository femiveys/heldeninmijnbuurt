import nodemailer from "nodemailer";
import { templates } from "./templates";
import { SentMessageInfo } from "../../types";
import { getRequestorEmailByRelationId } from "../superHero/common";

const transporter = nodemailer.createTransport({
  host: "178.208.49.162",
  port: 2525,
  secure: false,
  auth: {
    user: "ID179346_fenekobe",
    pass: "SV9mXBZskD*P",
  },
});

const from = '"Femi Veys 👻" <femi@itsimplyworks.be>';

export const sendMail = async (to: string, mailId: string) => {
  if (!templates[mailId]) console.log(`No template defined for: ${mailId}`);

  if (process.env.NODE_ENV === "production") {
    const info: SentMessageInfo = await transporter.sendMail({
      from,
      to,
      ...templates[mailId],
    });
    console.log("Message sent", info);
    return info.messageId;
  } else {
    const fakeMessageId = `DEV: Message "${mailId}" would have been sent to "${to}". In production we would have seen the messageId here.`;
    console.log(fakeMessageId);
    return fakeMessageId;
  }
};

/**
 * Sends email to requestor of relation
 *
 * @param relationId - the id of relation for which a mails will be sent to the
 *                     requestor
 * @returns SentMessageInfo if sent, else null
 */

export const mailRequestorByRelationId = async (
  relationId: number,
  mailId: string
) => {
  const email = await getRequestorEmailByRelationId(relationId);
  return await sendMail(email, mailId);
};
