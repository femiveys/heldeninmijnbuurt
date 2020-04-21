import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";
import { TStreetFromDb } from "../../../apiHelpers/types.db";
import { transformStreets } from "../../../apiHelpers/transformers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const {
        query: { postalCode },
      } = req;
      const streets = await db<TStreetFromDb[]>("street")
        .where("postal_code", postalCode)
        .orderBy("street_desc_nl", "asc")
        .orderBy("street_desc_fr", "asc")
        .orderBy("street_desc_de", "asc")
        .select("id", "street_desc_nl", "street_desc_fr", "street_desc_de");
      res.send(transformStreets(streets));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
