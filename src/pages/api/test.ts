import { NextApiRequest, NextApiResponse } from "next";
import { getNumMasksDelivered } from "../../apiHelpers/stats/local";
import { sendMail } from "../../apiHelpers/mailer";

// TO BE USED TO TEST THE DB FUNCTIONS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const result = await sendMail(
        "femiveys@gmail.com,carolinerosu@hotmail.com",
        "message",
        // @ts-ignore
        undefined,
        "Is deze mail correct aangekomen?"
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
