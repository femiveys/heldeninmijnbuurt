import nodemailer from "nodemailer";
import { templates, TMailParams } from "./templates";
import { SentMessageInfo } from "../../types";
import { getRequestorByRelationId } from "../superhero/common";
import { getHeroByRelationId } from "../requestor/common";

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

export const sendMail = async (
  to: string,
  mailId: string,
  params: TMailParams,
  message?: string
) => {
  if (mailId !== "message" && !templates[mailId])
    console.log(`No template defined for: ${mailId}`);

  const { subject, text, html } = templates[mailId];

  const info: SentMessageInfo = await transporter.sendMail({
    from,
    to,
    subject,
    text: mailId === "message" ? message : text,
    html: html ? html(params) : mailId === "message" ? message : text,
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
  const hero = await getHeroByRelationId(relationId);
  if (!hero) throw new Error("Hero could not be found");

  const requestor = await getRequestorByRelationId(relationId);
  if (!requestor) throw new Error("Requestor could not be found");

  const to = toRole === "hero" ? hero.email : requestor.email;

  return await sendMail(to, mailId, { hero, requestor }, message);
};
