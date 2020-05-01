import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../apiHelpers/me";
import {
  getSuperHeroOf,
  getStatusMakerRelationOf,
} from "../../../../apiHelpers/requestor/superhero";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { type } = req.query;

      const firebaseUser = await getFirebaseUser(req);

      let result;
      switch (type) {
        case "full":
          result = await getSuperHeroOf(firebaseUser.uid);
          break;

        case "status":
          result = await getStatusMakerRelationOf(firebaseUser.uid);
          break;

        default:
          throw new Error("invalid type provided");
      }

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
