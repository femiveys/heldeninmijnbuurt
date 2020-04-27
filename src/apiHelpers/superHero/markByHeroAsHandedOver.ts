import { db } from "../../db";
import { checkMaker, checkRelationId } from "./common";
import { ERelationStatus } from "../../types";
import { sendMailByRelationId } from "../mailer";

/**
 * Puts de status of a relation on heroMarkedAsHandedOver.
 * Sets the hero_handover_date to now
 * Sends a heroMarkedAsHandedOver mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const markByHeroAsHandedOver = async (
  makerId: string,
  relationId: number
) => {
  checkRelationId(relationId);
  await checkMaker(makerId);

  const result = await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({
      status: ERelationStatus.heroMarkedAsHandedOver,
      hero_handover_date: new Date(),
    });

  if (result) {
    return await sendMailByRelationId(
      makerId,
      relationId,
      "heroMarkedAsHandedOver"
    );
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to heroMarkedAsHandedOver`
    );
  }
};
