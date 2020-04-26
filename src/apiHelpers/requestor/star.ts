import { getAcceptedMakerRelationOf, checkRequestor } from "./common";
import { db } from "../../db";

/**
 * Give stars to the accepted maker.
 * - The stars are set on the heroStars on the relation
 * - The stars and numEvaluation fields on the maker are also updated
 *
 * @param requestorId - the userId of the requestor
 * @param numStars - the number of stars to set should be between 1 and 5
 * @returns 1 if updated, else 0
 */
export const giveStarsToAcceptedMaker = async (
  requestorId: string,
  numStars: number
) => {
  await checkRequestor(requestorId);

  if (!Number.isInteger(numStars) || numStars < 1 || numStars > 5) {
    throw new Error("numStars should be 1, 2, 3, 4 or 5");
  }

  const acceptedMakerRelation = await getAcceptedMakerRelationOf(requestorId);

  if (acceptedMakerRelation) {
    await db("relation").where("id", acceptedMakerRelation.id).update({
      hero_stars: numStars,
    });
    return await db("user")
      .where("user_id", acceptedMakerRelation.heroId)
      .update({
        stars: db.raw(
          `(stars * num_evaluations + ${numStars}) / (num_evaluations + 1)`
        ),
        num_evaluations: db.raw("num_evaluations + 1"),
      });
  } else {
    console.log(
      `giveStarsToAcceptedMaker: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
    return 0;
  }
};
