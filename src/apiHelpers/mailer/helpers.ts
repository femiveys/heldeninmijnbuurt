import { db } from "../../db";
import { checkRelationId } from "../common";
import { TRelationRoles } from "../../types";

/**
 * Gets the email address of the user related to the relation specified
 *
 * @param role - if "hero", the hero_id will be followed on the relation
 *             - if "requestor", the requestor_id be followed on the relation
 * @param relationId - the id of the relation
 * @returns the email of the user referenced on the relation
 */
export const getEmailByRelationId = async (
  role: TRelationRoles,
  relationId: number
) => {
  checkRelationId(relationId);
  const result = await db("user")
    .join("relation", "user.user_id", `relation.${role}_id`)
    .where({ "relation.id": relationId })
    .first("email");

  return result ? result.email : null;
};
