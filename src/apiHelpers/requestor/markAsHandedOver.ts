import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { getMakerRelationOf, checkRequestor } from "./common";
import { ERelationStatus } from "../../types";

/**
 * Sets the status of the maker relation to handedOver.
 * Sets the requestor_handover_date to now
 * Sends a requestorMarkedAsHandedOver mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @returns The messageId of the mail sent
 */
export const markAsHandedOver = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    const result = await db("relation").where({ id: relation.id }).update({
      status: ERelationStatus.handedOver,
      requestor_handover_date: new Date(),
    });

    if (result) {
      return await mailByRelationId(
        "hero",
        relation.id,
        "requestorMarkedAsHandedOver"
      );
    } else {
      throw new Error(
        `There was a problem setting relation ${relation.id} to requestorMarkedAsHandedOver`
      );
    }
  } else {
    throw new Error(
      `markAsHandedOver: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};
