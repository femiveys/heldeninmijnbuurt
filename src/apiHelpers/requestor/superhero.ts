import { getMakerRelationOf, checkRequestor } from "./common";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import { TUserFromDb } from "../types.db";
import { ERelationStatus, TDistanceAndStatus } from "../../types";
import { pick } from "lodash";

/**
 * Gets the superhero
 * A requestor can only access the superhero data when the status of the
 * relation is: accepted
 *
 * @param requestorId - the userId of the requestor
 * @returns The user object of the superhero
 *          null if not found or not allowed to access
 */
export const getSuperHeroOf = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (
    relation &&
    (relation.status === ERelationStatus.accepted ||
      relation.status === ERelationStatus.handedOver)
  ) {
    const superhero = await db("user")
      .where("user_id", relation.heroId)
      .first<TUserFromDb>();
    return {
      relation: relation,
      user: transformUserFromDb(superhero),
    };
  } else {
    return null;
  }
};

/**
 * Gets the status of the relation the requestor has with the maker
 *
 * @param requestorId - the userId of the requestor
 * @returns The status of the relation or null if no relation was found
 */
export const getDistanceAndStatusMakerRelationOf = async (
  requestorId: string
) => {
  await checkRequestor(requestorId);
  const relation = await getMakerRelationOf(requestorId);
  return relation
    ? (pick(relation, "status", "distance") as TDistanceAndStatus)
    : null;
};
