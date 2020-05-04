import { db } from "../db";
import { TUserFromDb, TRelationFromDb } from "./types.db";

export const getGlobalStats = async () => {
  const numMakers = await getNumMakers();
  const numMasksDelivered = await getNumMasksDelivered();

  return {
    numMakers,
    numMasksDelivered,
  };
};

const getNumMakers = async () => {
  const result = await db<TUserFromDb>("user")
    .where({ is_maker: 1 })
    .count("user_id", { as: "count" });

  return result[0].count;
};

const getNumMasksDelivered = async () => {
  const result = await db<TRelationFromDb>("relation")
    .join("user", "relation.requestor_id", "user.user_id")
    .whereNotNull("hero_handover_date")
    .orWhereNotNull("requestor_handover_date")
    .sum("needs_mouthmask_amount", { as: "sum" });

  return result[0].sum;
};
