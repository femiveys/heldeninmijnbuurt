import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "../../../../apiHelpers/me";
import {
  getSuperHeroOf,
  getDistanceAndStatusMakerRelationOf,
} from "../../../../apiHelpers/requestor/superhero";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { type } = req.query;

      const userId = await getUserId(req);

      let result;
      switch (type) {
        case "full":
          result = await getSuperHeroOf(userId);
          break;

        case "status":
          result = await getDistanceAndStatusMakerRelationOf(userId);
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
