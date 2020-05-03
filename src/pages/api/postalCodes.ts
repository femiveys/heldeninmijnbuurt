import { NextApiRequest, NextApiResponse } from "next";
import { getPostalCodes } from "../../apiHelpers/enterStreet";
import { getUid } from "../../apiHelpers/me";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await getUid(req);
      const postalCodes = await getPostalCodes();
      res.send(postalCodes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
