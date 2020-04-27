import { db } from "../../db";
import { ERelationType } from "../../types";
import { TRelationFromDb } from "../types.db";
import { transformRelationFromDb } from "../transformers";

/**
 * Gets the assigned maker for a specific requestor
 *
 * @param requestorId - the userId of the requestor
 * @returns the relation of the maker who accepted the request if found
 *          null in not found
 */
export const getMakerRelationOf = async (requestorId: string) => {
  const relation = await db("relation")
    .where({
      type: ERelationType.maskRequest,
      requestor_id: requestorId,
    })
    .first<TRelationFromDb>();

  return transformRelationFromDb(relation);
};

/**
 * Checks if the passed requestorId needs mouthmasks
 *
 * @param requestorId - the userId of the requestor
 * @returns true if the passed requestorId needs mouthmasks, false otherwise
 */
const needsMouthmask = async (requestorId: string) => {
  const result = await db("user")
    .where({ user_id: requestorId, needs_mouthmask: 1 })
    .where("needs_mouthmask_amount", ">", 0)
    .where("needs_mouthmask_amount", "<=", 5)
    .first("user_id");

  return !!result;
};

/**
 * Throws error if the passed requestorId is not of a valid requestor
 *
 * @param requestorId - the userId of the requestor
 */
export const checkRequestor = async (requestorId: string) => {
  if (!(await needsMouthmask(requestorId))) {
    throw new Error("User doesn't need mouthmasks");
  }
};
