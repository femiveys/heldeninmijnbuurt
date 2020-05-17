import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "../../../../apiHelpers/me";
import { accept } from "../../../../apiHelpers/superhero/accept";
import { decline } from "../../../../apiHelpers/superhero/decline";
import { markAsHandedOver } from "../../../../apiHelpers/superhero/markAsHandedOver";
import { logProblem } from "../../../../apiHelpers/superhero/problem";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const { action, relationId } = req.query;
      const { problem } = req.body;

      const userId = await getUserId(req);

      const relId = Number(relationId);

      let result;
      switch (action) {
        case "accept":
          result = await accept(userId, relId);
          break;

        case "decline":
          result = await decline(userId, relId);
          break;

        case "problem":
          result = await logProblem(userId, relId, problem.toString());
          break;

        case "markAsHandedOver":
          result = await markAsHandedOver(userId, relId);
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
