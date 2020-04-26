import { db } from "../../db";
import { checkMaker } from "./common";
import { ERelationStatus } from "../../types";
import { sendMailByRelationId } from "../mailer";

/**
 * Puts de status of a relation on accepted.
 * Sets the accept_date to now
 * Sends an accepted mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const acceptRequest = async (makerId: string, relationId: number) => {
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.accepted, accept_date: new Date() });

  if (result) {
    return await sendMailByRelationId(makerId, relationId, "accepted");
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to accepted`
    );
  }
};

/**
 * Puts de status of a relation on declined.
 * Sets the decline_date to now
 * Sends a declined mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const declineRequest = async (makerId: string, relationId: number) => {
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.declined, decline_date: new Date() });

  if (result) {
    return await sendMailByRelationId(makerId, relationId, "declined");
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to declined`
    );
  }
};