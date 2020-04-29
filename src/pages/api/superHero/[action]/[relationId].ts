import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../apiHelpers/me";
import { accept } from "../../../../apiHelpers/superhero/accept";
import { decline } from "../../../../apiHelpers/superhero/decline";
import { markAsHandedOver } from "../../../../apiHelpers/superhero/markAsHandedOver";

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
