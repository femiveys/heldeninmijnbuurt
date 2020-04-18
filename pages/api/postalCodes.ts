import { db } from "../../db";
import { NextApiRequest, NextApiResponse } from "next";

type TPostalCodesResponse = { postal_code: number }[];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const postalCodes = await db("streets").distinct<TPostalCodesResponse>(
        "postal_code"
      );
      // TODO: camelcase interceptor
      res.send(postalCodes.map(postalCode => postalCode.postal_code));
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
