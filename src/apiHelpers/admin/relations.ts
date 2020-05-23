import { db } from "../../db";
import { TUserFromDb, TStreetFromDb, TRelationFromDb } from "../types.db";
import { checkAdmin } from "./common";
import { transformFullRelationFromDb } from "../transformers";

export const getRelations = async (userId: string) => {
  await checkAdmin(userId);

  const users = await db<TRelationFromDb>("relation")
    .join<TUserFromDb>("user as hero", "relation.hero_id", "hero.user_id")
    .join<TUserFromDb>(
      "user as requestor",
      "relation.requestor_id",
      "requestor.user_id"
    )
    .join<TStreetFromDb>("street as hstreet", "hstreet.id", "hero.street_id")
    .join<TStreetFromDb>(
      "street as rstreet",
      "rstreet.id",
      "requestor.street_id"
    )
    .select<TUserFromDb[]>()
    .options({ nestTables: "_" });
  console.log(users);

  return users.map((user) => transformFullRelationFromDb(user));
};
