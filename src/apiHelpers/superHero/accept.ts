import { db } from "../../db";
import { checkRelationId } from "../common";
import { mailByRelationId } from "../mailer";
import { ERelationStatus } from "../../types";
import { checkMaker } from "./common";
import { TRelationFromDb, TUserFromDb } from "../types.db";

/**
 * Puts de status of a relation on accepted.
 * Sets the accept_date to now
 * Decrease the stock of the maker
 * Sends an accepted mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const accept = async (makerId: string, relationId: number) => {
  checkRelationId(relationId);
  await checkMaker(makerId);

  await decreaseStock(makerId, relationId);

  const result = await db<TRelationFromDb>("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.accepted, accept_date: new Date() });

  if (result) {
    return await mailByRelationId("requestor", relationId, "accepted");
  } else {
    throw new Error(
      `There was a problem setting relation ${relationId} to accepted`
    );
  }
};

const decreaseStock = async (makerId: string, relationId: number) => {
  // Get the needs_mouthmask_amount of the requestor found on the relation
  const result = await db<TUserFromDb>("user")
    .join<TRelationFromDb>("relation", "user.user_id", "relation.requestor_id")
    .where("relation.id", relationId)
    .first<TUserFromDb>("user.needs_mouthmask_amount");

  const amount = result.needs_mouthmask_amount;

  return await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .update({ mask_stock: db.raw(`mask_stock - ${amount}`) });
};
