import { NextApiRequest, NextApiResponse } from "next";
import { getGlobalStats } from "../../apiHelpers/stats";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const stats = await getGlobalStats();
      res.send(stats);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
