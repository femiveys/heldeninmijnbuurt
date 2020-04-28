import { NextApiRequest, NextApiResponse } from "next";
import { getPostalCodes } from "../../src/apiHelpers/enterStreet";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const postalCodes = await getPostalCodes();
      res.send(postalCodes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
