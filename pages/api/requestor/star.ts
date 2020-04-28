import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { starMaker } from "../../../src/apiHelpers/requestor/star";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { stars } = req.body;
      const firebaseUser = await getFirebaseUser(req);
      const result = await starMaker(firebaseUser.uid, stars);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
