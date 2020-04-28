import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../../src/apiHelpers/me";
import {
  getAcceptedRequests,
  getRequestedRequests,
} from "../../../../src/apiHelpers/superHero/requests";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { name } = req.query;

      const firebaseUser = await getFirebaseUser(req);

      let result;
      switch (name) {
        case "requested":
          result = await getRequestedRequests(firebaseUser.uid);
          break;

        case "accepted":
          result = await getAcceptedRequests(firebaseUser.uid);
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
