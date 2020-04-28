import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { setMaskStock } from "../../../src/apiHelpers/superHero/setMaskStock";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { maskStock } = req.body;
      const firebaseUser = await getFirebaseUser(req);
      const result = await setMaskStock(firebaseUser.uid, maskStock);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
