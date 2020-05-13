import { db } from "../../db";
import { TUserFromDb, TRelationFromDb } from "../types.db";
import { checkMaker, getMaskStock } from "./common";
import { hasNoActiveRelation, createMaskRelation } from "../common";
import { sortBy } from "lodash";
import { ERelationStatus } from "../../types";

/**
 * Sets mask_stock to amount
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
  const nearestRequestors = await getNearestRequestors(makerId);

  const eligableRequestors = await filterRequestorsWithoutActiveRelation(
    nearestRequestors
  );

  const activeMakerRelations = await getActiveMakerRelations(makerId);

  const filteredRequestors = filterOwnActiveRequestors(
    activeMakerRelations,
    eligableRequestors
  );

  // We prioritize on short distance
  const sortedRequestors = sortBy(filteredRequestors, "maxDistance");

  const numberOfRelationsAdded = createLimitedRelations(
    makerId,
    maskStock,
    sortedRequestors,
    activeMakerRelations.length
  );

  return numberOfRelationsAdded;
};

const filterRequestorsWithoutActiveRelation = async (
  requestors: TRequestor[]
) => {
  const hasNoActiveRelationMap = await Promise.all(
    requestors.map((requestor) => hasNoActiveRelation(requestor.requestorId))
  );

  return requestors.filter((_, index) => hasNoActiveRelationMap[index]);
};

/**
 * We loop over the sortedRequestors to make new relations and we make sure
 * - that the maker doesn't end up with more than 10 active relations
 * - that the stock doesn't get 0
 * @param makerId - the userId of the maker to find new requestor for
 * @param maskStock - the stock of the maker
 * @param requestors - the list of requestors to try to add
 * @param numberOfActiveRelations - the number of active relations the maker
 *                                  currently has
 * @returns The number of relations added
 */
const createLimitedRelations = async (
  makerId: string,
  maskStock: number,
  requestors: TRequestor[],
  numberOfActiveRelations: number
) => {
  // We make sure 1 maker doesn't have more that 10 active relations
  const maxNumberToAdd =
    Number(process.env.MAX_ACTIVE_RELATIONS) - numberOfActiveRelations;
  const numberToAdd = Math.min(maxNumberToAdd, requestors.length);

  let i = 0;
  let maskStockLeft = maskStock;
  while (i < numberToAdd && maskStockLeft >= 0) {
    const requestor = requestors[i];
    await createMaskRelation(
      requestor.requestorId,
      makerId,
      requestor.distance
    );
    i++;
    maskStockLeft -= requestor.amount;
  }

  return i;
};

const getActiveMakerRelations = async (makerId: string) =>
  await db<TRelationFromDb>("relation")
    .where({ hero_id: makerId })
    .whereIn("status", [ERelationStatus.requested, ERelationStatus.accepted])
    .select();

type TRequestor = {
  amount: number;
  distance: number;
  requestorId: string;
};

// Filter out all requestors of the relations the maker already has
const filterOwnActiveRequestors = (
  activeMakerRelations: TRelationFromDb[],
  eligableRequestors: TRequestor[]
) => {
  const requestorIdsOfActiveRelations = activeMakerRelations.map(
    (activeMakerRelation) => activeMakerRelation.requestor_id
  );
  return eligableRequestors.filter(
    (requestor) =>
      !requestorIdsOfActiveRelations.includes(requestor.requestorId)
  );
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
  maxDistance: number = Number(process.env.MAX_DISTANCE)
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
