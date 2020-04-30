import { db } from "../../db";
import { checkRelationId } from "../common";
import { mailByRelationId } from "../mailer";
import { ERelationStatus } from "../../types";
import { checkMaker, getNeedsMouthmaskAmount } from "./common";
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
  await setAccepted(makerId, relationId);
  return await mailByRelationId("requestor", relationId, "accepted");
};

const setAccepted = async (makerId: string, relationId: number) =>
  await db<TRelationFromDb>("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.accepted, accept_date: new Date() });

const decreaseStock = async (makerId: string, relationId: number) => {
  const amount = await getNeedsMouthmaskAmount(relationId);

  return await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .update({ mask_stock: db.raw(`mask_stock - ${amount}`) });
};
