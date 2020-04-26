import { NextApiRequest, NextApiResponse } from "next";
import { sendMailByRelationId } from "../../../src/apiHelpers/mailer";
import { getFirebaseUser } from "../../../src/apiHelpers/me";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { relationId } = req.query;
      const { mailId } = req.body;

      const firebaseUser = await getFirebaseUser(req);
      const result = await sendMailByRelationId(
        firebaseUser.uid,
        Number(relationId),
        mailId
      );
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
