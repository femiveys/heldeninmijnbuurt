import { NextApiRequest, NextApiResponse } from "next";
import {
  getUserId,
  getFirebaseUser,
  getRealUserId,
} from "../../../apiHelpers/me";
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

      const { userId } = await getUserId(req);
      const firebaseUser = await getFirebaseUser(req);
      const undisguisedUserId = await getRealUserId(firebaseUser);

      let result;
      switch (name) {
        case "cancel":
          result = await cancel(userId);
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(userId);
          break;

        case "setNeedsMouthmaskAmount":
          result = await setNeedsMouthmaskAmount(userId, num);
          break;

        case "starMaker":
          result = await starMaker(userId, num);
          break;

        case "disguise":
          result = await disguise(undisguisedUserId);
          break;

        case "undisguise":
          result = await undisguise(undisguisedUserId);
          break;

        case "thank":
          const message = num;
          result = await thank(userId, message);
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
