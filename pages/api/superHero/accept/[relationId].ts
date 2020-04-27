import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../src/apiHelpers/me";
import { accept } from "../../../../src/apiHelpers/superHero/accept";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { relationId } = req.query;
      const firebaseUser = await getFirebaseUser(req);
      const result = await accept(firebaseUser.uid, Number(relationId));
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
