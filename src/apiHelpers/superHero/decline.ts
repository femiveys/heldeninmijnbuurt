import { db } from "../../db";
import { checkMaker, reAssign } from "./common";
import { checkRelationId } from "../common";
import { mailByRelationId } from "../mailer";
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
  await setDeclined(makerId, relationId);
  const distanceUserId = await reAssign(relationId);
  return distanceUserId
    ? await mailByRelationId("requestor", relationId, "declinedAndReassigned")
    : await mailByRelationId("requestor", relationId, "declined");
};

const setDeclined = async (makerId: string, relationId: number) =>
  await db<TRelationFromDb>("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.declined, decline_date: new Date() });
