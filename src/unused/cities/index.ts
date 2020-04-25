import { isVlaanderen } from "./../../../base/city/cityHelpers";
import { fetchCities } from "./../../../base/city/fetchCities";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

type TPostalCodesResponse = { postal_code: number }[];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { vlaanderen } = req.query;

      const cities = await fetchCities();

      res.send(
        vlaanderen ? cities.filter((c) => isVlaanderen(c.postal)) : cities
      );
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};
