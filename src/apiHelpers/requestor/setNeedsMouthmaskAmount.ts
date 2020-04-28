import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { checkRequestor } from "./common";
import { assignMakerTo } from "./assign";

/**
 * Sets needs_mouthmask_amount to amount
 * TODO: make sture this can only be set once
 * TODO: Check input
 *
 * @param requestorId - the userId of the requestor
 * @param amount - the number to set
 * @returns The distance and userId of the maker if found
 *          null if a relation already exists or all relations are declined
 */
export const setNeedsMouthmaskAmount = async (
  requestorId: string,
  amount: number
) => {
  await checkRequestor(requestorId);

  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask_amount: amount,
  });

  return await assignMakerTo(requestorId);
};
