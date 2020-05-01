import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseUser } from "../../../apiHelpers/me";
import { cancel } from "../../../apiHelpers/requestor/cancel";
import { markAsHandedOver } from "../../../apiHelpers/requestor/markAsHandedOver";
import { setNeedsMouthmaskAmount } from "../../../apiHelpers/requestor/setNeedsMouthmaskAmount";
import { starMaker } from "../../../apiHelpers/requestor/star";
import { thank } from "../../../apiHelpers/requestor/thank";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { name, num } = req.body;

      const firebaseUser = await getFirebaseUser(req);

      let result;
      switch (name) {
        case "cancel":
          result = await cancel(firebaseUser.uid);
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(firebaseUser.uid);
          break;

        case "setNeedsMouthmaskAmount":
          result = await setNeedsMouthmaskAmount(firebaseUser.uid, num);
          break;

        case "starMaker":
          result = await starMaker(firebaseUser.uid, num);
          break;

        case "thank":
          const message = num;
          result = await thank(firebaseUser.uid, message);
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
