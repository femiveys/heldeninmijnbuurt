import { getAcceptedMakerRelationOf, checkRequestor } from "./common";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import { TUserFromDb } from "../types.db";

/**
 * Get the superHero
 *
 * @param requestorId - the userId of the requestor
 * @returns The user object of the superHero, null if not found
 */
export const getSuperHeroOf = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const acceptedMakerRelation = await getAcceptedMakerRelationOf(requestorId);

  if (acceptedMakerRelation) {
    const superHero = await db("user")
      .where("user_id", acceptedMakerRelation.heroId)
      .first<TUserFromDb>();
    return {
      relation: acceptedMakerRelation,
      user: transformUserFromDb(superHero),
    };
  } else {
    console.log(
      `getSuperHeroOf: user (${requestorId}) doesn't have an accepted maker relation, so no heroes to be found here`
    );
    return null;
  }
};
