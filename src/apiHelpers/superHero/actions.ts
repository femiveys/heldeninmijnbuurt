import { db } from "../../db";
import { checkMaker } from "./common";
import { ERelationStatus } from "../../types";

/**
 * Puts de status of a relation on accepted and sets the accept_date
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns 1 if updated, else 0
 */
export const acceptRequest = async (makerId: string, relationId: number) => {
  await checkMaker(makerId);

  return await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.accepted, accept_date: new Date() });
};

/**
 * Puts de status of a relation on declined and sets the decline_date
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns 1 if updated, else 0
 */
export const declineRequest = async (makerId: string, relationId: number) => {
  await checkMaker(makerId);

  return await db("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({ status: ERelationStatus.declined, decline_date: new Date() });
};
