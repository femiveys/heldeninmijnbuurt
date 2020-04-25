import nodemailer from "nodemailer";
import { templates } from "./templates";

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

type SentMessageInfo = {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
};

export async function sendMail(to: string, mailId: string) {
  const info: SentMessageInfo = await transporter.sendMail({
    from,
    to,
    ...templates[mailId],
  });
  console.log("Message sent: %s", info.messageId);
  return info;
}
