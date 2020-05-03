import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../../apiHelpers/me";
import {
  getSuperHeroOf,
  getDistanceAndStatusMakerRelationOf,
} from "../../../../apiHelpers/requestor/superhero";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { type } = req.query;

      const uid = await getUid(req);

      let result;
      switch (type) {
        case "full":
          result = await getSuperHeroOf(uid);
          break;

        case "status":
          result = await getDistanceAndStatusMakerRelationOf(uid);
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
