import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { unsetIsMaker } from "../../../src/apiHelpers/me/unsetIsMaker";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const firebaseUser = await getFirebaseUser(req);
      const result = await unsetIsMaker(firebaseUser.uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
