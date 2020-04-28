import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { getAcceptedRequests } from "../../../src/apiHelpers/superHero/requests";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await getAcceptedRequests(firebaseUser.uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
