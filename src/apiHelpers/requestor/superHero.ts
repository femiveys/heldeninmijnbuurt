import { getMakerRelationOf, checkRequestor } from "./common";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import { TUserFromDb } from "../types.db";

/**
 * Get the superhero
 *
 * @param requestorId - the userId of the requestor
 * @returns The user object of the superhero, null if not found
 */
export const getSuperHeroOf = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
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
