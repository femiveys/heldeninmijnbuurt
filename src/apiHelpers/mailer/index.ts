import nodemailer from "nodemailer";
import { templates } from "./templates";
import { SentMessageInfo } from "../../types";
import { getEmailByRelationId } from "./helpers";

const transporter = nodemailer.createTransport({
  host: "178.208.49.162",
  port: 2525,
  secure: false,
  auth: {
    user: "ID179346_fenekobe",
    pass: "SV9mXBZskD*P",
  },
});

const from = '"Helden in mijn buurt" <noreply@heldeninmijnbuurt.be>';

const suffix = `<br />
               Ga naar
               <a href="https://heldeninmijnbuurt.now.sh" target="_blank">
                 Helden in mijn buurt
               </a>`;

export const sendMail = async (
  to: string,
  mailId: string,
  message?: string
) => {
  if (mailId !== "message" && !templates[mailId])
    console.log(`No template defined for: ${mailId}`);

  const fields =
    mailId === "message" && message
      ? { subject: "Dank je wel, superheld", text: message }
      : templates[mailId];

  // if (process.env.NODE_ENV === "production") {
  const info: SentMessageInfo = await transporter.sendMail({
    from,
    to,
    html: fields.text + suffix,
    ...fields,
  });
  console.log("Message sent", info);
  return info.messageId;
  // } else {
  //   const fakeMessageId = `DEV: Message "${mailId}" would have been sent to "${to}". In production we would have seen the messageId here.`;
  //   console.log("--- MAIL SENT ---");
  //   console.log("templateId:", mailId);
  //   console.log("to:", to);
  //   console.log("");
  //   // console.log(fakeMessageId);
  //   return fakeMessageId;
  // }
};

/**
 * Sends email to the hero or the requestor a specific relation
 *
 * @param relationId - the id of the relation for which a mails will be sent to
 *                     the hero or the requestor
 * @returns SentMessageInfo if sent, else null
 */

export const mailByRelationId = async (
  toRole: "hero" | "requestor",
  relationId: number,
  mailId: string,
  message?: string
) => {
  const email = await getEmailByRelationId(toRole, relationId);
  return await sendMail(email, mailId, message);
};
