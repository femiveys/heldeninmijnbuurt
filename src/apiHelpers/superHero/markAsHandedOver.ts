import { db } from "../../db";
import { checkMaker, getNeedsMouthmaskAmount } from "./common";
import { ERelationStatus } from "../../types";
import { mailByRelationId } from "../mailer";
import { checkRelationId } from "../common";
import { TUserFromDb } from "../types.db";

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
  await setHandedOver(makerId, relationId);
  await increaseNumDelivered(makerId, relationId);
  return await mailByRelationId(
    "requestor",
    relationId,
    "heroMarkedAsHandedOver"
  );
};

const setHandedOver = async (makerId: string, relationId: number) =>
  await db("relation").where({ id: relationId, hero_id: makerId }).update({
    status: ERelationStatus.handedOver,
    hero_handover_date: new Date(),
  });

const increaseNumDelivered = async (makerId: string, relationId: number) => {
  const amount = await getNeedsMouthmaskAmount(relationId);

  return await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .update({
      num_delivered: db.raw(`num_delivered + ${amount}`),
    });
};
