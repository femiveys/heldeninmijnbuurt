import { db } from "../../db";
import { TUserFromDb, TRelationFromDb } from "../types.db";
import { checkMaker, getMaskStock } from "./common";
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

  const oldMaskStock = await getMaskStock(makerId);

  await db<TUserFromDb>("user").where({ user_id: makerId }).update({
    mask_stock: amount,
  });

  if (oldMaskStock < amount) {
    return await assignNearestUnassignedRequestors(makerId, amount);
  } else {
    return 0;
  }
};

/**
 * Assigns requestors nearby that don't have a maker assigned to the maker
 * We make sure the stock doesn't get exhausted
 * We make sure a makes cannot get assigned more than 10 relations at a time
 * @param makerId - the userId of the maker to find new requestor for
 * @param maskStock - the stock of the maker
 * @returns The number of relations added
 */
const assignNearestUnassignedRequestors = async (
  makerId: string,
  maskStock: number
) => {
  // Get all the nearest requestorIds
  const nearestRequestors = await getNearestRequestors(makerId);

  // Of all the nearest requestors we need to filter out the ones with no
  // relations or with all relations are declined.
  // In other words, we need to keep all the ones with no active relations
  const eligableRequestors = nearestRequestors.filter(
    async (requestor) => await hasNoActiveRelation(requestor.requestorId)
  );

  // Then we filter out all requestors of the relations the maker already has
  const activeMakerRelations = await getActiveMakerRelations(makerId);
  const requestorIdsOfActiveRelations = activeMakerRelations.map(
    (activeMakerRelation) => activeMakerRelation.requestor_id
  );
  const filteredRequestors = eligableRequestors.filter(
    (requestor) =>
      !requestorIdsOfActiveRelations.includes(requestor.requestorId)
  );

  // Then we prioritize on short distance
  const sortedRequestors = sortBy(filteredRequestors, "maxDistance");

  // We make sure 1 maker doesn't have more that 10 active relations
  const maxNumberToAdd = MAX_ACTIVE_RELATIONS - activeMakerRelations.length;
  const numberToAdd = Math.min(maxNumberToAdd, sortedRequestors.length);

  // We loop over the sortedRequestors to make new relations
  // and we make sure the maker doesn't end up with more than 10 active relations
  // the stock doesn't get 0
  let i = 0;
  let maskStockLeft = maskStock;
  while (i < numberToAdd && maskStockLeft >= 0) {
    const requestor = sortedRequestors[i];
    await createMaskRelation(
      requestor.requestorId,
      makerId,
      requestor.distance
    );
    i++;
    maskStockLeft -= requestor.amount;
  }

  // Finally we return the number of created relations
  return i;
};

export const getActiveMakerRelations = async (makerId: string) => {
  const result = await db<TRelationFromDb>("relation")
    .where({ hero_id: makerId })
    .whereIn("status", [ERelationStatus.requested, ERelationStatus.accepted])
    .select();
  return result;
};

type TRequestor = {
  amount: number;
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
const getNearestRequestors = async (
  makerId: string,
  maxDistance: number = MAX_DISTANCE
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, h_street.geolocation)";
  const sql = `
    SELECT
      ${distance} distance,
      requestor.user_id requestorId,
      requestor.needs_mouthmask_amount amount
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

  const results = await db.raw<TRequestor[][]>(sql, {
    makerId,
    maxDistance,
  });

  return results[0];
};
