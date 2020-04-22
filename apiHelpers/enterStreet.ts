import { db } from "../db";
import { TPostalCodeFromDb, TShortStreetFromDb } from "./types.db";
import { transformStreets } from "./transformers";

export const getPostalCodes = async () => {
  const postalCodes = await db("street")
    .distinct("postal_code")
    .select<TPostalCodeFromDb[]>("postal_code");

  return postalCodes.map((postalCode) => postalCode.postal_code);
};

export const getStreetsByPostalCode = async (postalCode: number) => {
  const streets = await db<TShortStreetFromDb>("street")
    .where("postal_code", postalCode)
    .orderBy("street_desc_nl", "asc")
    .orderBy("street_desc_fr", "asc")
    .orderBy("street_desc_de", "asc")
    .select("id", "street_desc_nl", "street_desc_fr", "street_desc_de");

  return transformStreets(streets);
};
