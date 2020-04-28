import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { checkRequestor } from "./common";

/**
 * Sets needs_mouthmask_amount to amount
 * TODO: make sture this can only be set once
 * TODO: Check input
 *
 * @param requestorId - the userId of the requestor
 * @param amount - the number to set
 * @returns 1 if the update succeeded, 0 otherwise
 */
export const setNeedsMouthmaskAmount = async (
  requestorId: string,
  amount: number
) => {
  await checkRequestor(requestorId);

  return await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask_amount: amount,
  });
};
