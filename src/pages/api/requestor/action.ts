import { NextApiRequest, NextApiResponse } from "next";
import { getUid, getFirebaseUser } from "../../../apiHelpers/me";
import { cancel } from "../../../apiHelpers/requestor/cancel";
import { markAsHandedOver } from "../../../apiHelpers/requestor/markAsHandedOver";
import { setNeedsMouthmaskAmount } from "../../../apiHelpers/requestor/setNeedsMouthmaskAmount";
import { starMaker } from "../../../apiHelpers/requestor/star";
import { thank } from "../../../apiHelpers/requestor/thank";
import { disguise } from "../../../apiHelpers/requestor/disguise";
import { undisguise } from "../../../apiHelpers/requestor/undisguise";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { name, num } = req.body;

      const firebaseUser = await getFirebaseUser(req);
      const uid = await getUid(req);

      let result;
      switch (name) {
        case "cancel":
          result = await cancel(uid);
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(uid);
          break;

        case "setNeedsMouthmaskAmount":
          result = await setNeedsMouthmaskAmount(uid, num);
          break;

        case "starMaker":
          result = await starMaker(uid, num);
          break;

        case "disguise":
          result = await disguise(firebaseUser.uid);
          break;

        case "undisguise":
          result = await undisguise(firebaseUser.uid);
          break;

        case "thank":
          const message = num;
          result = await thank(uid, message);
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
