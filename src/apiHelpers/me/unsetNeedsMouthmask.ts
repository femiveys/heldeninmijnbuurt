import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { hasNoActiveRelation } from "../common";

/**
 * Sets needs_mouthmask from 1 to 0.
 * This is only allowed if no needs_mouthmask_amount has been set, in other
 * words when needs_mouthmask_amount=0 or if the user has no active relations
 * An error is thrown
 * - if needs_mouthmask_amount has been set before
 * or
 * - if the user with user_id=requestorId does not exist
 * or
 * - if the user has an active relation
 *
 * @param requestorId - the userId of the requestor
 * @returns 1 if the update succeeded, 0 otherwise
 */
export const unsetNeedsMouthmask = async (requestorId: string) => {
  const user = await db<TUserFromDb>("user")
    .where({
      user_id: requestorId,
      needs_mouthmask: 1,
      needs_mouthmask_amount: 0,
    })
    .first();

  if (user) {
    return await doUnsetNeedsMouthmask(requestorId);
  } else {
    const hasActiveRelation = !(await hasNoActiveRelation(requestorId));

    if (!hasActiveRelation) {
      return await doUnsetNeedsMouthmask(requestorId);
    } else {
      throw new Error(
        `User (${requestorId}) is not allowed to unset the needs_mouthmask flag`
      );
    }
  }
};

const doUnsetNeedsMouthmask = async (requestorId: string) =>
  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask: 0,
  });
