import { db } from "../../db";
import { checkMaker, checkRelationId } from "./common";
import { ERelationStatus } from "../../types";
import { mailRequestorByRelationId } from "../mailer";

/**
 * Puts de status of a relation on accepted.
 * Sets the accept_date to now
 * Sends an accepted mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const accept = async (makerId: string, relationId: number) => {
  checkRelationId(relationId);
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.accepted, accept_date: new Date() });

  if (result) {
    return await mailRequestorByRelationId(relationId, "accepted");
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to accepted`
    );
  }
};
