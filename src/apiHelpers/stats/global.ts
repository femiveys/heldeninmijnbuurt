import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { EUserStatus } from "../../types";

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
  const result = await db<TUserFromDb>("user")
    .where("status", EUserStatus.done)
    .sum("needs_mouthmask_amount", { as: "sum" });

  return result[0].sum;
};
