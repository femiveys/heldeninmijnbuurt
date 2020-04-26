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
  const info: SentMessageInfo = await transporter.sendMail({
    from,
    to,
    ...templates[mailId],
  });
  console.log("Message sent: %s", info.messageId);
  return info;
};

/**
 * Puts de status of a relation on accepted and sets the accept_date
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the id of relation having a hero_id linking to the user
 *                     to send a mail to
 * @returns SentMessageInfo if sent, else null
 */

export const sendMailByRelationId = async (
  makerId: string,
  relationId: number,
  mailId: string
) => {
  const email = await getRequestorEmailByRelationId(makerId, relationId);

  if (email) {
    return await sendMail(email, mailId);
  } else {
    return null;
  }
};
