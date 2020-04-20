import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { getMeOrFail } from "../_helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Request x amount of mouthmasks
  if (req.method === "POST") {
    try {
      const me = await getMeOrFail(req);
      return res.send({});
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const me = await getMeOrFail(req);
      return res.send({});
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  return res.send({});
};
