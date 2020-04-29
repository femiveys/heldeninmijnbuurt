import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../apiHelpers/me";
import { setMaskStock } from "../../../apiHelpers/superhero/setMaskStock";

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
