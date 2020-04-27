import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../src/apiHelpers/me";
import { markByHeroAsHandedOver } from "../../../../src/apiHelpers/superHero/markByHeroAsHandedOver";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { relationId } = req.query;
      const firebaseUser = await getFirebaseUser(req);
      const result = await markByHeroAsHandedOver(
        firebaseUser.uid,
        Number(relationId)
      );
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};