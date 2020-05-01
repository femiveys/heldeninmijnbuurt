import { db } from "../../db";
import { checkMaker, reAssign } from "./common";
import { checkRelationId } from "../common";
import { mailByRelationId } from "../mailer";
import { TRelationFromDb } from "../types.db";
import { ERelationStatus } from "../../types";

/**
 * Sets the status of a relation to problem
 * Logs the problem of a relation
 * Sets the problem_date to now
 * Assigns a new maker to the requestor
 * Sends a problem mail
 *
 * @param makerId - the userId of the maker to check if he is allowed to do this
 * @param relationId - the relationId to update
 * @returns The messageId of the mail sent
 */
export const logProblem = async (
  makerId: string,
  relationId: number,
  problem: string
) => {
  checkRelationId(relationId);
  await checkMaker(makerId);
  await setProblem(makerId, relationId, problem);
  const distanceUserId = await reAssign(relationId);
  return distanceUserId
    ? await mailByRelationId("requestor", relationId, "problemAndReassigned")
    : await mailByRelationId("requestor", relationId, "problem");
};

const setProblem = async (
  makerId: string,
  relationId: number,
  problem: string
) =>
  await db<TRelationFromDb>("relation")
    .where({ id: relationId, hero_id: makerId })
    .update({
      problem,
      status: ERelationStatus.problem,
      problem_date: new Date(),
    });
