import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import { checkMaker } from "./common";

/**
 * Sets mask_stock to amount
 * TODO: try to assign more
 * TODO: check input
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param amount - the number to set
 * @returns 1 if the update succeeded, 0 otherwise
 */
export const setMaskStock = async (makerId: string, amount: number) => {
  await checkMaker(makerId);

  return await db<TUserFromDb>("user").where({ user_id: makerId }).update({
    mask_stock: amount,
  });
};
