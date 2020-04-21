import { db } from "../../db";
import { ERelationType, ERelationStatus } from "../../types";
import { TRelationFromDb } from "../types.db";
import { transformRelation } from "../transformers";

/**
 * Gets the relation of the maker who accepted the request
 *
 * @param requestorId - the userId of the requestor
 * @returns the relation of the maker who accepted the request if found
 *          null in not found
 */
export const getAcceptedMakerRelationOf = async (requestorId: string) => {
  const relation = await db<TRelationFromDb>("relation").first().where({
    type: ERelationType.maskRequest,
    status: ERelationStatus.accepted,
    requestor_id: requestorId,
  });

  return transformRelation(relation);
};
