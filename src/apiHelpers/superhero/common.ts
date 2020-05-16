import { db } from "../../db";
import {
  TUserFromDb,
  TRelationFromDb,
  TUserAndDistanceFromDb,
} from "../types.db";
import { checkRelationId } from "../common";
import { assignMakerTo } from "../assign";
import { transformUserFromDb } from "../transformers";

/**
 * Checks if the passed makerId is a valid maker
 *
 * @param makerId - the userId of the maker
 * @returns true if the passed makerId is a valid maker, false otherwise
 */
const isMaker = async (makerId: string) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: makerId, is_maker: 1 })
    .first("user_id");

  return !!result;
};

/**
 * Throws error if the passed makerId is not of a valid maker
 *
 * @param makerId - the userId of the maker
 * @returns true if the passed requestorId needs mouthmasks, false otherwise
 */
export const checkMaker = async (makerId: string) => {
  if (!(await isMaker(makerId))) {
    throw new Error("User is not a maker");
  }
};

/**
 * Gets the current maskStock of the maker
 *
 * @param makerId - the userId of the maker
 * @returns the current maskStock of the maker
 */
export const getMaskStock = async (makerId: string) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .first("mask_stock");
  return result ? result.mask_stock : 0;
};

/**
 * Gets number of mouthmasks reqested of a relation
 *
 * @param relationId - the id of the relation to look on
 * @returns The number of mouthmasks reqested
 */
export const getNeedsMouthmaskAmount = async (relationId: number) => {
  const result = await db<TUserFromDb>("user")
    .join<TRelationFromDb>("relation", "user.user_id", "relation.requestor_id")
    .where("relation.id", relationId)
    .first<TUserFromDb>("user.needs_mouthmask_amount");

  return result.needs_mouthmask_amount;
};

/**
 * Reassigns a maker to the requestor of the relation.
 * It is assumed the relation has been set to declined before.
 *
 * @param relationId - the id of the relation to find the requestor on
 * @returns The distance and userId of the maker if found
 */
export const reAssign = async (relationId: number) => {
  const result = await db("relation")
    .where({ id: relationId })
    .first<TRelationFromDb>();

  checkRelationId(relationId);

  return await assignMakerTo(result.requestor_id);
};

export const getRequestorByRelationId = async (relationId: number) => {
  const result = await db<TUserFromDb>("user")
    .join<TRelationFromDb>("relation", "relation.requestor_id", "user.user_id")
    .where("relation.id", relationId)
    .first<TUserAndDistanceFromDb>("user.*", "relation.distance");
  return transformUserFromDb(result);
};
