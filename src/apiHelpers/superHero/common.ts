import { db } from "../../db";

/**
 * Checks if the passed makerId is a valid maker
 *
 * @param makerId - the userId of the maker
 * @returns true if the passed makerId is a valid maker, false otherwise
 */
const isMaker = async (makerId: string) => {
  const result = await db("user")
    .where({ user_id: makerId, is_maker: 1 })
    .first("user_id");

  return !!result;
};

/**
 * Throws error if the passed makerId is not of a valid maker
 *
 * @param makerId - the userId of the maker
 * @returns true if the passed requestorId needs mouthmasks, false otherwise
 */
export const checkMaker = async (makerId: string) => {
  if (!(await isMaker(makerId))) {
    throw new Error("User is not a maker");
  }
};
