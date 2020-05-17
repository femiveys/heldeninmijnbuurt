import { db } from "../../db";
import { TUserFromDb, TStreetFromDb } from "../types.db";
import { checkAdmin } from "./common";
import { transformUserFromDb } from "../transformers";

export const getUsers = async (userId: string) => {
  await checkAdmin(userId);

  const users = await db<TUserFromDb>("user")
    .join<TStreetFromDb>("street", "street.id", "user.street_id")
    .select<TUserFromDb[]>(
      "user.*",
      "street.postal_code",
      "street.street_desc_de",
      "street.street_desc_fr",
      "street.street_desc_nl",
      "geolocation"
    );

  return users.map((user) => transformUserFromDb(user));
};
