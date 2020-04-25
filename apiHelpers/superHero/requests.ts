import { db } from "../../db";
import { ERelationStatus, TRelationUser, TRequestedRequest } from "../../types";
import { TRelationFromDb, TUserFromDb } from "../types.db";
import { transformUserFromDb, transformRelationFromDb } from "../transformers";
import { pick } from "lodash";
import { checkMaker } from "./common";

/**
 * Gets an array of all requested requests
 *
 * @param makerId - the userId of the maker
 * @returns Array of all requested requests with relationId and limited user
 *          and relations data
 */
export const getRequestedRequests = async (makerId: string) => {
  const assignedRequests = await getAssignedRequests(makerId);

  return assignedRequests
    .filter(
      (assignedRequest) =>
        assignedRequest.relation.status === ERelationStatus.requested
    )
    .map((assignedRequest) => ({
      ...pick(
        assignedRequest.user,
        "name",
        "needsMouthmaskAmount",
        "numEvaluations",
        "stars"
      ),
      ...pick(assignedRequest.relation, "distance", "requestDate"),
      relationId: assignedRequest.relation.id,
    })) as TRequestedRequest[];
};

/**
 * Gets an array of all accepted requests
 *
 * @param makerId - the userId of the maker
 * @returns Array of all accepted requests
 */
export const getAcceptedRequests = async (makerId: string) => {
  const assignedRequests = await getAssignedRequests(makerId);

  return assignedRequests.filter(
    (assignedRequest) =>
      assignedRequest.relation.status === ERelationStatus.accepted
  );
};

/**
 * Gets an array of all requested and accepted requests
 *
 * @param makerId - the userId of the maker
 * @returns Array of all requested and accepted requests
 */
const getAssignedRequests = async (makerId: string) => {
  await checkMaker(makerId);

  const results = await db<TRelationFromDb>("relation")
    .where("relation.hero_id", makerId)
    .whereIn("status", [ERelationStatus.requested, ERelationStatus.accepted])
    .select();

  const assignedRequests = await Promise.all(
    results.map(async (relation) => {
      const requestor = await db<TUserFromDb>("user")
        .where("user_id", relation.requestor_id)
        .first();

      if (!requestor) {
        // TODO: Remove the relation in this case?
        console.log(
          `getAssignedRequests: user (requestor_id=${relation.requestor_id}) associated to relation (id=${relation.id}) doesn't exist`
        );
      }

      return {
        relation: transformRelationFromDb(relation),
        user: transformUserFromDb(requestor),
      } as TRelationUser;
    })
  );

  // Filter out the assignedRequests that don't have a requestor
  return assignedRequests.filter((request) => !!request.user);
};
