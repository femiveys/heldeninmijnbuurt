import { NextApiRequest, NextApiResponse } from "next";
import { camelizeKeys } from "humps";
import { db } from "../../../db";

export type TStreet = {
  id: number;
  postal_code: number;
  street_desc_nl?: string;
  street_desc_fr?: string;
  street_desc_de?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const {
        query: { postalCode },
      } = req;
      const streets = await db<TStreet[]>("street")
        .where("postal_code", postalCode)
        .orderBy("street_desc_nl", "asc")
        .orderBy("street_desc_fr", "asc")
        .orderBy("street_desc_de", "asc")
        .select("id", "street_desc_nl", "street_desc_fr", "street_desc_de");
      res.send(streets);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
