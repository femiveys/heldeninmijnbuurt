import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../apiHelpers/me";
import { getGlobalStats } from "../../../apiHelpers/stats/global";
import { getLocalStats } from "../../../apiHelpers/stats/local";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { type } = req.query;

      let result;
      switch (type) {
        case "global":
          result = await getGlobalStats();
          break;

        case "local":
          const uid = await getUid(req);
          result = await getLocalStats(uid);
          break;

        default:
          break;
      }

      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
