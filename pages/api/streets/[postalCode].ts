import { NextApiRequest, NextApiResponse } from "next";
import { camelizeKeys } from "humps";
import { db } from "../../../db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const {
        query: { postalCode }
      } = req;
      const streets = await db("streets").where({ postal_code: postalCode });

      // TODO: camelcase interceptor
      res.send(streets.map(street => camelizeKeys(street)));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
