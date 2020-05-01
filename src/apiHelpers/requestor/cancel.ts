import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { getMakerRelationOf, checkRequestor } from "./common";
import { ERelationStatus } from "../../types";
import { TUserFromDb, TRelationFromDb } from "../types.db";

/**
 * Sets the cancel_date on the user to now
 * Sets the needs_mouthmask on the user to 0
 * Sets the status of the maker relation to cancelled.
 * Sets the cancel_date on the relation to now
 * Sends a cancelled mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @returns The messageId of the mail sent
 */
export const cancel = async (requestorId: string) => {
  await checkRequestor(requestorId);

  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask: 0,
    cancel_date: new Date(),
  });

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    const result = await db<TRelationFromDb>("relation")
      .where({ id: relation.id })
      .update({
        status: ERelationStatus.cancelled,
        cancel_date: new Date(),
      });

    if (result) {
      return await mailByRelationId("hero", relation.id, "cancelled");
    } else {
      throw new Error(
        `There was a problem setting relation ${relation.id} to cancelled`
      );
    }
  } else {
    throw new Error(
      `cancel: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};
