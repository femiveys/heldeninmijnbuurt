import { db } from "../../db";
import { checkMaker, checkRelationId } from "./common";
import { sendMailByRelationId } from "../mailer";
import { assignMakerTo } from "../requestor/assign";
import { ERelationStatus } from "../../types";
import { TRelationFromDb } from "../types.db";

/**
 * Puts de status of a relation on declined.
 * Sets the decline_date to now
 * Assigns a new maker to the requestor
 * Sends a declined mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const decline = async (makerId: string, relationId: number) => {
  checkRelationId(relationId);
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.declined, decline_date: new Date() });

  if (result) {
    const distanceUserId = await reAssign(relationId);

    console.log("distanceUserId", distanceUserId);

    return await sendMailByRelationId(makerId, relationId, "declined");
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to declined`
    );
  }
};

/**
 * Reassigns a maker to the requestor of the relation.
 * It is assumed the relation has been set to declined before.
 *
 * @param relationId - the id of the relation to find the requestor on
 * @returns The messageId of the mail sent
 */
const reAssign = async (relationId: number) => {
  const result = await db("relation")
    .where({ id: relationId })
    .first<TRelationFromDb>();

  checkRelationId(relationId);

  return await assignMakerTo(result.requestor_id);
};
