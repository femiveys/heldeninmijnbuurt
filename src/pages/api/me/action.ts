import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../apiHelpers/me";
import { setIsMaker } from "../../../apiHelpers/me/setIsMaker";
import { setNeedsMouthmask } from "../../../apiHelpers/me/setNeedsMouthmask";
import { stopMaking } from "../../../apiHelpers/me/unsetIsMaker";
import { unsetNeedsMouthmask } from "../../../apiHelpers/me/unsetNeedsMouthmask";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { name } = req.body;

      const uid = await getUid(req);

      let result;
      switch (name) {
        case "setIsMaker":
          result = await setIsMaker(uid);
          break;

        case "unsetIsMaker":
          result = await stopMaking(uid);
          break;

        case "setNeedsMouthmask":
          result = await setNeedsMouthmask(uid);
          break;

        case "unsetNeedsMouthmask":
          result = await unsetNeedsMouthmask(uid);
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
