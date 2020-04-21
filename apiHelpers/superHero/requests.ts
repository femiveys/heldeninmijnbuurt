import { db } from "../../db";
import { ERelationStatus } from "../../types";
import { TRelationFromDb, TUserFromDb } from "../types.db";
import { transformUser, transformRelation } from "../transformers";

/**
 * Gets an array of all pending and requested requests
 *
 * @param makerId - the userId of the maker
 * @returns Array of all requested and accepted requests
 */
export const getAssignedRequests = async (makerId: string) => {
  const results = await db<TRelationFromDb>("relation")
    .select()
    .where("relation.hero_id", makerId)
    .whereIn("status", [ERelationStatus.accepted, ERelationStatus.requested]);

  const assignedRequests = await Promise.all(
    results.map(async (relation) => {
      const requestor = await db("user")
        .first<TUserFromDb>()
        .where("user_id", relation.requestor_id);

      if (!requestor) {
        // TODO: Remove the relation in this case?
        console.log(
          `getAssignedRequests: user (requestor_id=${relation.requestor_id}) associated to relation (id=${relation.id}) doesn't exist`
        );
      }

      return {
        requestor: transformUser(requestor),
        relation: transformRelation(relation),
      };
    })
  );

  // Filter out the assignedRequests that don't have a requestor
  return assignedRequests.filter((request) => !!request.requestor);
};
