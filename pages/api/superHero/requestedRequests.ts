import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../apiHelpers/me/helpers";
import { getRequestedRequests } from "../../../apiHelpers/superHero/requests";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await getRequestedRequests(firebaseUser.uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
