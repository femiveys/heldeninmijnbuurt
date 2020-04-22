import { NextApiRequest, NextApiResponse } from "next";
import { getStreetsByPostalCode } from "../../../apiHelpers/enterStreet";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const {
        query: { postalCode },
      } = req;
      const streets = await getStreetsByPostalCode(Number(postalCode));
      res.send(streets);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
