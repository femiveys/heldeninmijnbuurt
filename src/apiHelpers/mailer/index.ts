import nodemailer from "nodemailer";
import { templates, TMailParams } from "./templates";
import { SentMessageInfo } from "../../types";
import { getRequestorByRelationId } from "../superhero/common";
import { getHeroByRelationId } from "../requestor/common";
import { contactEmail } from "../../helpers";

const transporter = nodemailer.createTransport({
  host: "178.208.49.162",
  port: 2525,
  secure: false,
  auth: {
    user: "ID179346_fenekobe",
    pass: "SV9mXBZskD*P",
  },
  dkim: {
    domainName: "heldeninmijnbuurt.be",
    keySelector: "key1",
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAvd1V/VBLsqrViXI8rXv6wAbWZVldj5ltSvW9iSU5aC4S8qVj
0dm3zZdLPq7gJIvCQA4xn7/BowTn+MQyj5Jz2KR1mB8okk0NyDXWm4V4L3OtXIrM
eKcqfKZPX3hX+ympHcYv2n2WE55usZU4hDUuQF4pYCjFRXfFEl6kGoRY3uNEfZtT
OKTP54WHMJU97ZPT9GsOF6GNQ8PIN332yc6XhMJyTmmAOK7hBqNUrub3BVyO+Hge
A67t1Ve6NnUFU+6HGyyw00e7bCTanEjnyY5tEqJ8xCtELfYP/Yt6aEE+jO2Gpv56
+d/g8/uFru1Pckp5swjb6lnTFfrH4hqOCfxdfQIDAQABAoIBAQCOgOL6htraFhjB
2ckrGOPiXv9qAEIV9r0uRvVkS1kkFXjJQFOEfRnUqFqkiJLZO0Cn3T9nvIA0wAjw
ESo10mE62G0eqTxFWqoefDJAdlP3oaYb0F2ZrTZZamYmrOe0Ltes7kSahCoxPXet
t+c8a8H0M/hwIQm3kyaKHBilgnJFjxmbVs7humuogIxNHYxbGunp0Sb+nnnh3pUc
ggQ6+vHzuTHNE7FvZB+pLxx0RMfuqITmpGJa9bfHmC7xm1ZKExvyn5WZdxUzt661
GAx+9JkL+Wjrbb89YuI7kdZ0d7+4TZhqwdL3Wvfy3kAPCuALnkWvzLbkTPj8VOT1
1uyhcUItAoGBANcUTm3ErM9UveZ2ApIOtj48/4e/dULoGSpIXd4LwcxQ0Ar0TqQB
qjEfD7ZJhQQ8I4dDYH8steLoQYdkkyd3H4Y9qcnPR8rhXaePZhzlAPGZiEEtJF7T
hkwB6nDHS9Fi693+u14dB6TBK6Ouu4ZOqizEswSilQv4uKelq9Hzp1izAoGBAOH8
6pAbs0aitvLfMSYJHmqIGeOpKWOVAvJFa0vu2yeGmPKO6rDQmlhUCwUzuzP8EqEH
VLm7/3oIl50pqz3cbTZY5RUhtqMcoemrU0BvOqIaOpLVGLZcpddnSDK3TNlmaZkA
JIXLDRWbzLgKjosllNVmm3ZGcTbV/Vpu59Qf4KkPAoGAPdr5M1h82qPkeYM2+gqB
HyUr2D6X2sYldqOZW2LGOZyEOKJKe6B+8eGdAy/hsXYaQax+9BRHuxpQvj+OkqsP
xeu2CPQ0EYT/ClGTbHvv6YveQ+BXtW3gEbv7ULQAeheY/h9kg4yVxixIAKsgA2Bc
UMPBOHQJqYe+k3hyEc+hMUECgYEAt3NJsrxZ1yBlpVkbm8XRRCfB5HbBG46uep9x
z41RqI9x/42W5PwiH0vyOkHZWQTq1n+N/synQphRA4r88NXMbk7RgEsC6PxoT7j9
dxQUI91o6SNF0Vv6YJb+G/WC1AR3+nUMMPQ5Ze44zLn9JuXWIToPP39Fjn8+ELhx
R1itVm8CgYEAoL6ZIMYc+aU/6pPCkJKxoX4875zSU7+ZZGcTmCJVGlCio+izrwou
EcDz5zBsi0nj84zCfL3VZJ3w1ts4yWvMJDavtQCSX5ORPOqHtSsqqfIBnNOeovgU
eBEx3VKUJ1GCrxssn/NFmZx2BNv//r2PLFVRLU0vhJUNUXcJQ/5LFd0=
-----END RSA PRIVATE KEY-----
`,
  },
});

const from = `"Helden in mijn buurt" <${contactEmail}>`;

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
