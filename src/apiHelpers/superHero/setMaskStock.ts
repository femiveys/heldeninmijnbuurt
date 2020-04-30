import { db } from "../../db";
import { TUserFromDb, TRelationFromDb } from "../types.db";
import { checkMaker } from "./common";
import {
  MAX_DISTANCE,
  hasNoActiveRelation,
  createMaskRelation,
  MAX_ACTIVE_RELATIONS,
} from "../common";
import { sortBy } from "lodash";
import { ERelationStatus } from "../../types";

/**
 * Sets mask_stock to amount
 * TODO: try to assign more
 * TODO: check input
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param amount - the number to set
 * @returns The number of relations added
 */
export const setMaskStock = async (makerId: string, amount: number) => {
  await checkMaker(makerId);

  await db<TUserFromDb>("user").where({ user_id: makerId }).update({
    mask_stock: amount,
  });
  await assignNearestUnassignedRequestors(makerId);
};

export const assignNearestUnassignedRequestors = async (makerId: string) => {
  const activeMakerRelations = await getActiveMakerRelations(makerId);
  const requestorIdsOfActiveRelations = activeMakerRelations.map(
    (activeMakerRelation) => activeMakerRelation.requestor_id
  );

  // Get all the nearest requestorIds
  const nearestDistanceRequestorIds = await getNearestDistanceRequestorIds(
    makerId
  );

  // Of all the nearest requestorIds we need to filter out the ones with no
  // relations or with all relations are declined.
  // In other words, we need to keep all the ones with no active relations
  const eligableDistanceRequestors = nearestDistanceRequestorIds.filter(
    async (item) => await hasNoActiveRelation(item.requestorId)
  );

  // Then we filter out all distanceRequestors of the relations the maker already has
  const filteredDistanceRequestors = eligableDistanceRequestors.filter(
    (dr) => !requestorIdsOfActiveRelations.includes(dr.requestorId)
  );

  const sortedEligableRequestors = sortBy(
    filteredDistanceRequestors,
    "maxDistance"
  );

  const maxNumberToAdd = MAX_ACTIVE_RELATIONS - activeMakerRelations.length;
  const numberToAdd = Math.min(maxNumberToAdd, sortedEligableRequestors.length);

  let i;
  for (i = 0; i < numberToAdd; i++) {
    await createMaskRelation(
      sortedEligableRequestors[i].requestorId,
      makerId,
      sortedEligableRequestors[i].distance
    );
  }
  return i;
};

export const getActiveMakerRelations = async (makerId: string) => {
  const result = await db<TRelationFromDb>("relation")
    .where({ hero_id: makerId })
    .whereIn("status", [ERelationStatus.requested, ERelationStatus.accepted])
    .select();
  return result;
};

type TDistanceRequestorId = {
  distance: number;
  requestorId: string;
};

/**
 * Finds the nearest requestors
 *
 * @param makerId - the userId of the superhero
 * @param maxDistance - the maximum distance to look for a maker
 * @returns A list of the requestorIds and their distances from the makerId
 *          can be an empty array
 */
const getNearestDistanceRequestorIds = async (
  makerId: string,
  maxDistance: number = MAX_DISTANCE
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, h_street.geolocation)";
  const sql = `
    SELECT ${distance} distance, requestor.user_id requestorId
    FROM user requestor, street r_street, user hero, street h_street
    WHERE hero.user_id=:makerId
    AND requestor.street_id = r_street.id
    AND requestor.needs_mouthmask = 1
    AND hero.street_id = h_street.id
    AND hero.is_maker = 1
    AND hero.user_id <> requestor.user_id
    AND hero.mask_stock >= requestor.needs_mouthmask_amount
    AND requestor.needs_mouthmask_amount > 0
    AND ${distance} < :maxDistance
    `;

  const results = await db.raw<TDistanceRequestorId[][]>(sql, {
    makerId,
    maxDistance,
  });

  return results[0];
};
