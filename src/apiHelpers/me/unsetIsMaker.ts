import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Sets is_maker to 0 on the user identified by userId.
 * TODO: Cleanup of requests
 *
 * @param userId - the userId of the user who wants to stom being a maker
 * @returns 1 if updated, 0 otherwise
 */
export const unsetIsMaker = async (userId: string) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: userId })
    .update({ is_maker: 0 });

  return result;
};
