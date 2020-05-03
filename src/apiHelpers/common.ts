import { ERelationType, ERelationStatus } from "../types";
import { db } from "../db";
import { mailByRelationId } from "./mailer";

export const MAX_DISTANCE = 50000;
export const MAX_ACTIVE_RELATIONS = 10;

export const checkRelationId = (relationId: number) => {
  if (!relationId) throw new Error("No relationId was provided");
};

/**
 * Tests if a relation should be created.
 * In other words: if there is no active relation
 * A relation should be created
 * - if the requestor doesn't have any maskRequest relation
 * or
 * - if all maskRequest relation are declined or ended with a problem
 *
 * @param requestorId - the userId of the requestor
 * @returns true if it should be created, false otherwise
 */
export const hasNoRelationOrAllRelationsAreDeclinedOrInProblem = async (
  requestorId: string
) => {
  const results = await db("relation")
    .where({
      type: ERelationType.maskRequest,
      requestor_id: requestorId,
    })
    .select("status");

  // If there are no existing relations, we should create a new one
  if (!results) {
    return true;
  }

  let allDeclinedOrInProblem = true;
  results.forEach((relation) => {
    if (
      allDeclinedOrInProblem &&
      (relation.status === ERelationStatus.declined ||
        relation.status === ERelationStatus.problem)
    ) {
      allDeclinedOrInProblem = true;
    } else {
      allDeclinedOrInProblem = false;
    }
  });

  // If all existing relations are declined, we should create a new one
  return allDeclinedOrInProblem;
};

export const hasNoActiveRelation = hasNoRelationOrAllRelationsAreDeclinedOrInProblem;

/**
 * Creates a relation between a requestor and a maker.
 *
 * @param requestorId - the userId of the requestor
 * @param makerId - the userId of the maker
 * @param distance - the distance between the requestor and the maker
 * @returns The id of the inserted relation wrapped in an array
 */
export const createMaskRelation = async (
  requestorId: string,
  makerId: string,
  distance: number
) => {
  const returningArray = await db("relation")
    .returning("id")
    .insert({
      type: ERelationType.maskRequest,
      status: ERelationStatus.requested,
      requestor_id: requestorId,
      hero_id: makerId,
      distance: Math.round(distance),
    });

  const relationId = returningArray[0];
  if (relationId) {
    await mailByRelationId("hero", relationId, "assignedToHero");
    await mailByRelationId("requestor", relationId, "assignedToRequestor");
  }

  return returningArray;
};
