import { checkRequestorEvenAfterDone } from "./common";
import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Unsisguise the requestor
 *
 * @param requestorId - the userId of the requestor
 * @returns
 */
export const undisguise = async (requestorId: string) => {
  await checkRequestorEvenAfterDone(requestorId);

  // Update the user to set the mocked_user_id if the user is a tester
  return await db<TUserFromDb>("user")
    .where("user_id", requestorId)
    .where("is_tester", 1)
    .update({ mocked_user_id: db.raw("DEFAULT") });
};
