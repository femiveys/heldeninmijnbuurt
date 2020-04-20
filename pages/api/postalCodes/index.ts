import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

type TPostalCodesResponse = { postal_code: number }[];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      let cities = await db("street")
        .distinct<TPostalCodesResponse>("postal_code")
        .select(
          "postal_code",
          "municipality_desc_nl",
          "municipality_desc_fr",
          "municipality_desc_de"
        );
      res.send(cities);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
