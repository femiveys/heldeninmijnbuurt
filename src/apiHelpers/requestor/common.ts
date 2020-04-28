import { db } from "../../db";
import { ERelationType, ERelationStatus } from "../../types";
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
    .whereIn("status", [
      ERelationStatus.requested,
      ERelationStatus.accepted,
      ERelationStatus.handedOver,
    ])
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
 * Checks if the passed requestorId has cancelled. This will disallow him from
 * doing any call as requestor
 *
 * @param requestorId - the userId of the requestor
 * @returns true if the passed requestorId has cancelled, false otherwise
 */
const hasCancelled = async (requestorId: string) => {
  const result = await db("user")
    .where({ user_id: requestorId })
    .whereNotNull("cancel_date")
    .first("user_id");

  return !!result;
};

/**
 * Throws error if the passed requestorId is not of a valid requestor
 *
 * @param requestorId - the userId of the requestor
 */
export const checkRequestor = async (requestorId: string) => {
  if (await hasCancelled(requestorId)) {
    throw new Error("User has cancelled his request");
  }
  if (!(await needsMouthmask(requestorId))) {
    throw new Error("User doesn't need mouthmasks");
  }
};
