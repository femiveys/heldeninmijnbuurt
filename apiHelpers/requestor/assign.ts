import { db } from "../../db";
import { ERelationType, ERelationStatus } from "../../types";

/**
 * Tries to assign a requestor to a maker that has not declined yet
 *
 * @param requestorId - the userId of the requestor
 * @returns The distance and userId of the maker if found
 *          null if a relation already exists or all relations are declined
 */
export const assignMakerTo = async (requestorId: string) => {
  const shouldCreate = await shouldCreateRelation(requestorId);
  if (!shouldCreate) {
    console.log("There is an active relation");
    return null;
  }

  const declinedMakerIds = await getDeclinedMakerIds(requestorId);

  const distanceAndMakerId = await findNearestMakerId(
    requestorId,
    declinedMakerIds
  );

  if (distanceAndMakerId) {
    const { distance, userId } = distanceAndMakerId;
    await createMaskRelation(requestorId, userId, distance);
    return { distance, userId };
  } else {
    return null;
  }
};

/**
 * Finds the nearest maker that has enough stock.
 *
 * @param requestorId - the userId of the requestor
 * @param excludedMakerIds - list of userIds of makers to exclude
 * @param maxDistance - the maximum distance to look for a maker
 * @returns The distance and userId of the maker if found, null if not found
 */
const findNearestMakerId = async (
  requestorId: string,
  excludedMakerIds: string[] = [],
  maxDistance: number = 50000
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, h_street.geolocation)";
  const sql = `
    SELECT ${distance} distance, hero.user_id userId
    FROM user requestor, street r_street, user hero, street h_street
    WHERE requestor.user_id=:requestorId
    AND requestor.street_id = r_street.id
    AND hero.street_id = h_street.id
    AND hero.is_maker = 1
    AND hero.mask_stock >= requestor.needs_mouthmask_amount
    ${
      excludedMakerIds.length > 0
        ? "AND hero.user_id NOT IN (:excludedMakerIds)"
        : ""
    }
    AND ${distance} < :maxDistance
    ORDER BY distance
    LIMIT 1
    `;

  const results = await db.raw(sql, {
    requestorId,
    excludedMakerIds,
    maxDistance,
  });

  const result = results[0][0];

  if (result) {
    const { distance, userId } = result;
    return { distance, userId } as { distance: number; userId: string };
  } else {
    return null;
  }
};

/**
 * Creates a relation between a requestor and a maker.
 *
 * @param requestorId - the userId of the requestor
 * @param makerId - the userId of the maker
 * @param distance - the distance between the requestor and the maker
 */
const createMaskRelation = async (
  requestorId: string,
  makerId: string,
  distance: number
) => {
  await db("relation").insert({
    type: ERelationType.maskRequest,
    status: ERelationStatus.requested,
    requestor_id: requestorId,
    hero_id: makerId,
    distance: Math.round(distance),
  });
};

/**
 * Gets a list of userIds of makers that have already declined for this requestor.
 *
 * @param requestorId - the userId of the requestor
 * @returns The list of makerIds that have already declined for this requestor
 */
const getDeclinedMakerIds = async (requestorId: string) => {
  const declinedMakerIds = await db("relation").select("hero_id").where({
    type: ERelationType.maskRequest,
    status: ERelationStatus.declined,
    requestor_id: requestorId,
  });

  return declinedMakerIds;
};

/**
 * Tests if a relations should be created.
 * A relation should be created
 * - if the requestor doesn't have any maskRequest relation
 * - if all maskRequest relation are declined
 *
 * @param requestorId - the userId of the requestor
 * @returns true if it should be created, false otherwise
 */
const shouldCreateRelation = async (requestorId: string) => {
  const results = await db("relation").select("status").where({
    type: ERelationType.maskRequest,
    requestor_id: requestorId,
  });

  // If there are no existing relations, we should create a new one
  if (!results) {
    return true;
  }

  let allDeclined = true;
  results.forEach((relation) => {
    if (allDeclined && relation.status !== ERelationStatus.declined) {
      allDeclined = false;
    }
  });

  // If all existing relations are declined, we should create a new one
  return allDeclined;
};
