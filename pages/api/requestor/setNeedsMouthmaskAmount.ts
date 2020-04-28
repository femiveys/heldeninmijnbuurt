import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { setNeedsMouthmaskAmount } from "../../../src/apiHelpers/requestor/setNeedsMouthmaskAmount";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { needsMouthmaskAmount } = req.body;
      const firebaseUser = await getFirebaseUser(req);
      const result = await setNeedsMouthmaskAmount(
        firebaseUser.uid,
        needsMouthmaskAmount
      );
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
