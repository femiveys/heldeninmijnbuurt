import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../src/apiHelpers/me";
import { setIsMaker } from "../../../src/apiHelpers/me/setIsMaker";
import { unsetIsMaker } from "../../../src/apiHelpers/me/unsetIsMaker";
import { setNeedsMouthmask } from "../../../src/apiHelpers/me/setNeedsMouthmask";
import { unsetNeedsMouthmask } from "../../../src/apiHelpers/me/unsetNeedsMouthmask";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { name } = req.body;

      const firebaseUser = await getFirebaseUser(req);

      let result;
      switch (name) {
        case "setIsMaker":
          result = await setIsMaker(firebaseUser.uid);
          break;

        case "unsetIsMaker":
          result = await unsetIsMaker(firebaseUser.uid);
          break;

        case "setNeedsMouthmask":
          result = await setNeedsMouthmask(firebaseUser.uid);
          break;

        case "unsetNeedsMouthmask":
          result = await unsetNeedsMouthmask(firebaseUser.uid);
          break;

        default:
          throw new Error("invalid name provided for action");
      }

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
