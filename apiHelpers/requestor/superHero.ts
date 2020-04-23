import { getAcceptedMakerRelationOf } from "./common";
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
  const acceptedMakerRelation = await getAcceptedMakerRelationOf(requestorId);

  if (acceptedMakerRelation) {
    const superHero = await db("relation")
      .where("id", acceptedMakerRelation.id)
      .first<TUserFromDb>();
    return transformUserFromDb(superHero);
  } else {
    console.log(
      `getSuperHeroOf: user (${requestorId}) doesn't have an accepted maker relation, so no heroes to be found here`
    );
    return null;
  }
};
