import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { getMakerRelationOf, checkRequestor } from "./common";
import { ERelationStatus, EUserStatus } from "../../types";
import { TUserFromDb, TRelationFromDb } from "../types.db";
import { getNeedsMouthmaskAmount } from "../superhero/common";

/**
 * Sets the status on the user to cancelled
 * Sets the needs_mouthmask on the user to 0
 * Sets the status of the maker relation to cancelled.
 * Sets the cancel_date on the relation to now
 * Sends a cancelled mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @returns The messageId of the mail sent
 */
export const cancel = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    const amount = await getNeedsMouthmaskAmount(relation.id);

    await setCancelToRequestor(requestorId);
    await setCancelToRelation(relation.id);
    await increaseStockHero(relation.heroId, amount);

    return await mailByRelationId("hero", relation.id, "cancelled");
  } else {
    throw new Error(
      `cancel: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};

const setCancelToRequestor = async (requestorId: string) =>
  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask: 0,
    status: EUserStatus.cancelled,
  });

const setCancelToRelation = async (relationId: number) =>
  await db<TRelationFromDb>("relation").where({ id: relationId }).update({
    status: ERelationStatus.cancelled,
    cancel_date: new Date(),
  });

const increaseStockHero = async (makerId: string, amount: number) => {
  return await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .update({ mask_stock: db.raw(`mask_stock + ${amount}`) });
};
