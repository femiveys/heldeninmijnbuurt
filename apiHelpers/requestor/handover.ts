import { getAcceptedMakerRelationOf } from "./common";
import { db } from "../../db";

/**
 * Sets the requestor_handover_date to now() on the accepted maker relation
 *
 * @param requestorId - the userId of the requestor
 * @returns 1 if update has been done, else 0
 */
export const setHandoverDone = async (requestorId: string) => {
  const acceptedMakerRelation = await getAcceptedMakerRelationOf(requestorId);

  if (acceptedMakerRelation) {
    return await db("relation").where("id", acceptedMakerRelation.id).update({
      requestor_handover_date: new Date(),
    });
  } else {
    console.log(
      `setHandoverDone: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
    return 0;
  }
};
