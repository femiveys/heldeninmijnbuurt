import { getMakerRelationOf, checkRequestor } from "./common";
import { db } from "../../db";
import { mailByRelationId } from "../mailer";

/**
 * Give stars to the accepted maker.
 * - The stars are set on the heroStars on the relation
 * - The stars and numEvaluation fields on the maker are also updated
 *
 *  Sends a requestorStarredHero mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @param numStars - the number of stars to set should be between 1 and 5
 * @returns The messageId of the mail sent
 */
export const starMaker = async (requestorId: string, numStars: number) => {
  await checkRequestor(requestorId);

  if (!Number.isInteger(numStars) || numStars < 1 || numStars > 5) {
    throw new Error("numStars should be 1, 2, 3, 4 or 5");
  }

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    // Update the stars on the relation
    await db("relation").where("id", relation.id).update({
      hero_stars: numStars,
    });

    // Update the stars on the hero
    await db("user")
      .where("user_id", relation.heroId)
      .update({
        stars: db.raw(
          `(stars * num_evaluations + ${numStars}) / (num_evaluations + 1)`
        ),
        num_evaluations: db.raw("num_evaluations + 1"),
      });

    // Send mail to hero
    return await mailByRelationId("hero", relation.id, "requestorStarredHero");
  } else {
    throw new Error(
      `giveStarsToAcceptedMaker: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};
