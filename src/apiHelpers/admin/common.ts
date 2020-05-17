import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Checks if the passed userId is an admin
 *
 * @param userId
 * @returns true if the passed userId is an admin, false otherwise
 */
const isAdmin = async (userId: string) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: userId, is_admin: 1 })
    .first("user_id");

  return !!result;
};

/**
 * Throws error if the passed userId is not an admin
 *
 * @param makerId
 */
export const checkAdmin = async (userId: string) => {
  if (!(await isAdmin(userId))) {
    throw new Error("User is not an administrator");
  }
};
