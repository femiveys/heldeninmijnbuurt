import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../src/apiHelpers/me";
import { acceptRequest } from "../../../../src/apiHelpers/superHero/actions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { relationId } = req.query;
      if (!relationId) throw new Error("No relationId was provided");

      const firebaseUser = await getFirebaseUser(req);
      const result = await acceptRequest(firebaseUser.uid, Number(relationId));
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};