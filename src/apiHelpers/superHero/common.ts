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

export const checkRelationId = (relationId: number) => {
  if (!relationId) throw new Error("No relationId was provided");
};

/**
 * Gets the email address of the user related to the relation specified
 *
 * @param relationId - the id of the relation having a hero_id matching the makerId
 * @returns the email of the user referenced by the requestor_id of the relation
 */
export const getRequestorEmailByRelationId = async (relationId: number) => {
  checkRelationId(relationId);
  const result = await db("user")
    .join("relation", "user.user_id", "relation.requestor_id")
    .where({ "relation.id": relationId })
    .first("email");

  return result ? result.email : null;
};
