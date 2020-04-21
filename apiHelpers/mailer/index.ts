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

export async function sendMail(to: string, mailId: string) {
  const info = await transporter.sendMail({
    from,
    to,
    ...templates[mailId],
  });
  console.log("Message sent: %s", info.messageId);
  return info;
}
