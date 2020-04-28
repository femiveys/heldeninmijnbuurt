import { db } from "../../db";
import { checkMaker } from "./common";
import { ERelationStatus } from "../../types";
import { mailByRelationId } from "../mailer";
import { checkRelationId } from "../common";

/**
 * Sets de status of a relation to handedOver.
 * Sets the hero_handover_date to now
 * Sends a heroMarkedAsHandedOver mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const markAsHandedOver = async (makerId: string, relationId: number) => {
  checkRelationId(relationId);
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({
      status: ERelationStatus.handedOver,
      hero_handover_date: new Date(),
    });

  if (result) {
    return await mailByRelationId(
      "requestor",
      relationId,
      "heroMarkedAsHandedOver"
    );
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to heroMarkedAsHandedOver`
    );
  }
};
