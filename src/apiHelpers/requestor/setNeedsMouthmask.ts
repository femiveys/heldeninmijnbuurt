import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Sets needs_mouthmask to 1 for the user having requestorId as user_id.
 * An error is thrown if the current value for needs_mouthmask is not 0 or if
 * the user with user_id=requestorId does not exist
 *
 * @param requestorId - the userId of the requestor
 * @returns 1 if the update succeeded, 0 otherwise
 */
export const setNeedsMouthmask = async (requestorId: string) => {
  const user = await db<TUserFromDb>("user")
    .where({ user_id: requestorId, needs_mouthmask: 0 })
    .first();

  if (!user) {
    throw new Error(
      `User with needs_mouthmask=0 and id=${requestorId} could not be found. ` +
        `needs_mouthmask can only be set from 0 to 1`
    );
  }

  return await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask: 1,
  });
};
