import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Sets needs_mouthmask from 1 to 0.
 * This is only allowed if no needs_mouthmask_amount has been set, in other
 * words when needs_mouthmask_amount=0
 * An error is thrown if needs_mouthmask_amount has been set before
 * or if the user with user_id=requestorId does not exist
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

  if (!user) {
    throw new Error(
      `User with needs_mouthmask=1 and id=${requestorId} and ` +
        "needs_mouthmask_amount=0 could not be found."
    );
  }

  return await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask: 0,
  });
};
