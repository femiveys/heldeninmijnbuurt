import { db } from "../../db";
import { TUserFromDb, TRelationFromDb } from "../types.db";

/**
 * Reset the user
 *
 * @param userId - the id of the user to remove
 * @returns
 */
export const reset = async (userId: string) => {
  // Remove the relations if it was possible to remove the user as a test user
  if (await removeUser(userId)) return await removeRelations(userId);
};

const removeRelations = async (userId: string) =>
  db<TRelationFromDb>("relation")
    .where("hero_id", userId)
    .orWhere("requestor_id", userId)
    .delete();

const removeUser = async (userId: string) =>
  db<TUserFromDb>("user")
    .where("user_id", userId)
    .where("is_tester", 1)
    .delete();
