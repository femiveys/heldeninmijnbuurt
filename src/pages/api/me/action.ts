import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "../../../apiHelpers/me";
import { setIsMaker } from "../../../apiHelpers/me/setIsMaker";
import { setNeedsMouthmask } from "../../../apiHelpers/me/setNeedsMouthmask";
import { stopMaking } from "../../../apiHelpers/me/unsetIsMaker";
import { unsetNeedsMouthmask } from "../../../apiHelpers/me/unsetNeedsMouthmask";
import { reset } from "../../../apiHelpers/me/reset";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { name } = req.body;

      const userId = await getUserId(req);

      let result;
      switch (name) {
        case "setIsMaker":
          result = await setIsMaker(userId);
          break;

        case "unsetIsMaker":
          result = await stopMaking(userId);
          break;

        case "setNeedsMouthmask":
          result = await setNeedsMouthmask(userId);
          break;

        case "unsetNeedsMouthmask":
          result = await unsetNeedsMouthmask(userId);
          break;

        case "reset":
          result = await reset(userId);
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
