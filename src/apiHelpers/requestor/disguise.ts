import { getMakerRelationOf, checkRequestorEvenAfterDone } from "./common";
import { db } from "../../db";
import { TUserFromDb } from "../types.db";

/**
 * Disguise the requestor as his superhero
 *
 * @param requestorId - the userId of the requestor
 * @returns
 */
export const disguise = async (requestorId: string) => {
  await checkRequestorEvenAfterDone(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    // Update the user to set the mocked_user_id if the user is a tester
    return await db<TUserFromDb>("user")
      .where("user_id", requestorId)
      .where("is_tester", 1)
      .update({ mocked_user_id: relation.heroId });
  } else {
    throw new Error(
      `disguise: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};
