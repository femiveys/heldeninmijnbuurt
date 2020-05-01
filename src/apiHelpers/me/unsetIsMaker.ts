import { db } from "../../db";
import { TUserFromDb } from "../types.db";
import {
  getRequestedRequests,
  getAcceptedRequests,
} from "../superhero/requests";
import { decline } from "../superhero/decline";

/**
 * Stop as a maker.
 * Decline all active requests
 * Set isMaker on 0
 *
 * @param makerId - the userId of the maker who wants to stop
 * @returns 1 if update on user succeeded, 0 otherwise
 */
export const stopMaking = async (makerId: string) => {
  const requested = await getRequestedRequests(makerId);
  const accepted = await getAcceptedRequests(makerId);
  requested.forEach(
    async (request) => await decline(makerId, request.relationId)
  );
  accepted.forEach(
    async (request) => await decline(makerId, request.relation.id)
  );
  return await unsetIsMaker(makerId);
};

const unsetIsMaker = async (makerId: string) =>
  await db<TUserFromDb>("user")
    .where({ user_id: makerId })
    .update({ is_maker: 0, mask_stock: 0 });
