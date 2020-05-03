import { NextApiRequest, NextApiResponse } from "next";
import { getUid } from "../../../apiHelpers/me";
import { getSuperHeroOf } from "../../../apiHelpers/requestor/superhero";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const uid = await getUid(req);
      const result = await getSuperHeroOf(uid);
      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};
