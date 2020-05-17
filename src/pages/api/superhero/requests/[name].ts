import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "../../../../apiHelpers/me";
import {
  getAcceptedRequests,
  getRequestedRequests,
} from "../../../../apiHelpers/superhero/requests";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { name } = req.query;

      const userId = await getUserId(req);

      let result;
      switch (name) {
        case "requested":
          result = await getRequestedRequests(userId);
          break;

        case "accepted":
          result = await getAcceptedRequests(userId);
          break;

        default:
          throw new Error("invalid name provided action");
      }

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
