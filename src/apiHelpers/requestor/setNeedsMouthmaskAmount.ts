import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { assignMakerTo } from "../assign";

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
  //  Check that it is a requestor
  const result = await db("user").where({
    user_id: requestorId,
    needs_mouthmask: 1,
  });

  if (!result) throw new Error("User is not a requestor");

  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    needs_mouthmask_amount: amount,
  });

  return await assignMakerTo(requestorId);
};
