import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { getMakerRelationOf, checkRequestor } from "./common";
import { ERelationStatus } from "../../types";

/**
 * Sets the cancel_date on the user now
 * Sets the status of the maker relation to cancelled.
 * Sets the cancel_date on the relation to now
 * Sends a cancelled mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @returns The messageId of the mail sent
 */
export const cancel = async (requestorId: string) => {
  await checkRequestor(requestorId);

  await db("user").where({ user_id: requestorId }).update({
    cancel_date: new Date(),
  });

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    const result = await db("relation").where({ id: relation.id }).update({
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
