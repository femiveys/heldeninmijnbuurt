import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { setIsMaker } from "../../../src/apiHelpers/superHero/setIsMaker";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await setIsMaker(firebaseUser.uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
