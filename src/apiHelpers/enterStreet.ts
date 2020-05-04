import { db } from "../db";
import { TShortStreetFromDb } from "./types.db";
import { transformStreetsFromDb } from "./transformers";

export const getStreetsByPostalCode = async (postalCode: number) => {
  const streets = await db<TShortStreetFromDb>("street")
    .where("postal_code", postalCode)
    .orderBy("street_desc_nl", "asc")
    .orderBy("street_desc_fr", "asc")
    .orderBy("street_desc_de", "asc")
    .select("id", "street_desc_nl", "street_desc_fr", "street_desc_de");

  return transformStreetsFromDb(streets);
};
