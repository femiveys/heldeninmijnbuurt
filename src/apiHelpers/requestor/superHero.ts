import { getMakerRelationOf, checkRequestor } from "./common";
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

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    const superHero = await db("user")
      .where("user_id", relation.heroId)
      .first<TUserFromDb>();
    return {
      relation: relation,
      user: transformUserFromDb(superHero),
    };
  } else {
    return null;
  }
};
