import { db } from "../../db";
import { mailByRelationId } from "../mailer";
import { getMakerRelationOf, checkRequestor } from "./common";
import { ERelationStatus, EUserStatus } from "../../types";
import { TRelationFromDb, TUserFromDb } from "../types.db";

/**
 * Sets the status of the maker relation to handedOver.
 * Sets the requestor_handover_date to now
 * Sends a requestorMarkedAsHandedOver mail to the hero
 *
 * @param requestorId - the userId of the requestor
 * @returns The messageId of the mail sent
 */
export const markAsHandedOver = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const relation = await getMakerRelationOf(requestorId);

  if (relation) {
    await setRequestorHandedOverOnRelation(relation.id);

    await setUserDone(requestorId);

    return await mailByRelationId(
      "hero",
      relation.id,
      "requestorMarkedAsHandedOver"
    );
  } else {
    throw new Error(
      `markAsHandedOver: user (${requestorId}) doesn't have an accepted maker relation, so nothing has been updated`
    );
  }
};

const setRequestorHandedOverOnRelation = async (relationId: number) =>
  await db<TRelationFromDb>("relation").where({ id: relationId }).update({
    status: ERelationStatus.handedOver,
    requestor_handover_date: new Date(),
  });

const setUserDone = async (requestorId: string) =>
  await db<TUserFromDb>("user").where({ user_id: requestorId }).update({
    status: EUserStatus.done,
  });
