import { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "../../src/apiHelpers/mailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { to, mailId } = req.body;
      const result = await sendMail(to, mailId);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
