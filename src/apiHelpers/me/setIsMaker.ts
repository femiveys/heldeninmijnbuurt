import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Sets is_maker to 1 on the user identified by userId.
 * TODO: Assign unassigned requestors
 *
 * @param userId - the userId of the user who wants to become a maker
 * @returns 1 if updated, 0 otherwise
 */
export const setIsMaker = async (userId: string) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: userId })
    .update({ is_maker: 1 });

  return result;
};
