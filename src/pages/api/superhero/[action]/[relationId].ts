import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../../apiHelpers/me";
import { accept } from "../../../../apiHelpers/superhero/accept";
import { decline } from "../../../../apiHelpers/superhero/decline";
import { markAsHandedOver } from "../../../../apiHelpers/superhero/markAsHandedOver";
import { logProblem } from "../../../../apiHelpers/superhero/problem";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { action, relationId } = req.query;
      const { problem } = req.body;

      const uid = await getUid(req);

      const relId = Number(relationId);

      let result;
      switch (action) {
        case "accept":
          result = await accept(uid, relId);
          break;

        case "decline":
          result = await decline(uid, relId);
          break;

        case "problem":
          result = await logProblem(uid, relId, problem.toString());
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(uid, relId);
          break;

        default:
          throw new Error("invalid name provided");
      }

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
