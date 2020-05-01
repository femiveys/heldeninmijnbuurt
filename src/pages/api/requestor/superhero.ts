import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../apiHelpers/me";
import { getSuperHeroOf } from "../../../apiHelpers/requestor/superhero";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await getSuperHeroOf(firebaseUser.uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
