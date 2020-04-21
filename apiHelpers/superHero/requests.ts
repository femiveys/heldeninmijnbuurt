import { db } from "../../db";
import { ERelationStatus } from "../../types";
import { TRelationFromDb, TUserFromDb } from "../types.db";
import { transformUser, transformRelation } from "../transformers";

export const getAssignedRequests = async (makerId: string) => {
  const results = await db<TRelationFromDb>("relation")
    .select()
    .where("relation.hero_id", makerId)
    .whereIn("status", [ERelationStatus.pending, ERelationStatus.requested]);

  return Promise.all(
    results.map(async (relation) => {
      const requestor = await db<TUserFromDb>("user")
        .first()
        .where("user_id", relation.requestor_id);

      return {
        requestor: transformUser(requestor),
        relation: transformRelation(relation),
      };
    })
  );
};
