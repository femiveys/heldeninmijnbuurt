import { getMakerRelationOf, checkRequestorEvenAfterDone } from "./common";
import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { TRelationFromDb } from "../types.db";

/**
 * Set the thanks_date to now
 * Send a thank message to the maker from the requestor.
 *
 * @param requestorId - the userId of the requestor
 * @param message
 * @returns The messageId of the mail sent
 */
export const thank = async (requestorId: string, message: string) => {
  await checkRequestorEvenAfterDone(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    // Update the thanks_date the relation
    await db<TRelationFromDb>("relation").where("id", relation.id).update({
      thanks_date: new Date(),
    });

    // Send mail to hero
    return await mailByRelationId("hero", relation.id, "message", message);
  } else {
    throw new Error(
      `giveStarsToAcceptedMaker: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};
