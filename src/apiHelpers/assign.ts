import { db } from "../db";
import { ERelationType, ERelationStatus } from "../types";
import { checkRequestor } from "./requestor/common";
import { hasNoActiveRelation, createMaskRelation } from "./common";

/**
 * Tries to assign a requestor to a maker that has not declined yet
 * Then sends a mail to the maker and to the requestor (in the background)
 *
 * @param requestorId - the userId of the requestor
 * @returns The distance and userId of the maker if found
 *          null if a relation already exists or all relations are declined
 */
export const assignMakerTo = async (requestorId: string) => {
  await checkRequestor(requestorId);

  if (!(await hasNoActiveRelation(requestorId))) {
    throw new Error("There is an active relation");
  }

  const declinedMakerIds = await getDeclinedMakerIds(requestorId);

  const distanceAndMakerId = await findNearestMakerId(
    requestorId,
    declinedMakerIds
  );

  const { distance, userId } = distanceAndMakerId;
  await createMaskRelation(requestorId, userId, distance);

  return { distance, userId };
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
  maxDistance: number = Number(process.env.MAX_DISTANCE)
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, h_street.geolocation)";
  const sql = `
    SELECT ${distance} distance, hero.user_id userId
    FROM user requestor, street r_street, user hero, street h_street
    WHERE requestor.user_id=:requestorId
    AND requestor.street_id = r_street.id
    AND requestor.needs_mouthmask = 1
    AND hero.street_id = h_street.id
    AND hero.mask_stock >= requestor.needs_mouthmask_amount
    AND hero.user_id <> requestor.user_id
    AND hero.is_maker = 1
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
    throw new Error("No maker has been found");
  }
};

/**
 * Gets a list of userIds of makers that have already declined for this requestor.
 *
 * @param requestorId - the userId of the requestor
 * @returns The list of makerIds that have already declined for this requestor
 */
const getDeclinedMakerIds = async (requestorId: string) => {
  const rows = await db("relation")
    .where({
      type: ERelationType.maskRequest,
      status: ERelationStatus.declined,
      requestor_id: requestorId,
    })
    .select();

  return rows.map((row) => row.hero_id);
};
