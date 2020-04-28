import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../src/apiHelpers/me";
import { accept } from "../../../../src/apiHelpers/superHero/accept";
import { decline } from "../../../../src/apiHelpers/superHero/decline";
import { markAsHandedOver } from "../../../../src/apiHelpers/superHero/markAsHandedOver";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { action, relationId } = req.query;
      const firebaseUser = await getFirebaseUser(req);

      let result;
      switch (action) {
        case "accept":
          result = await accept(firebaseUser.uid, Number(relationId));
          break;

        case "decline":
          result = await decline(firebaseUser.uid, Number(relationId));
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(firebaseUser.uid, Number(relationId));
          break;

        default:
          throw new Error("invalid name provided");
      }

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
