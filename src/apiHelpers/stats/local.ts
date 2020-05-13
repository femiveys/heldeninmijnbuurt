import { db } from "../../db";
import { EUserStatus } from "../../types";
import { checkRequestor } from "../requestor/common";

export const getLocalStats = async (requestorId: string) => {
  await checkRequestor(requestorId);

  const numMakers = await getNumMakers(requestorId);
  const numMasksDelivered = await getNumMasksDelivered(requestorId);

  return {
    numMakers,
    numMasksDelivered,
  };
};

const getNumMakers = async (
  requestorId: string,
  maxDistance: number = Number(process.env.MAX_DISTANCE)
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, h_street.geolocation)";
  const sql = `
    SELECT COUNT(*) as count
    FROM user requestor, street r_street, user hero, street h_street
    WHERE requestor.user_id=:requestorId
    AND hero.is_maker = 1
    AND requestor.needs_mouthmask = 1
    AND requestor.street_id = r_street.id
    AND hero.street_id = h_street.id
    AND ${distance} < :maxDistance
    `;

  const results = await db.raw(sql, {
    requestorId,
    maxDistance,
  });

  return results[0][0]["count"];
};

export const getNumMasksDelivered = async (
  requestorId: string,
  maxDistance: number = Number(process.env.MAX_DISTANCE)
) => {
  const distance =
    "ST_Distance_Sphere(r_street.geolocation, d_street.geolocation)";
  const sql = `
    SELECT SUM(done.needs_mouthmask_amount) as sum
    FROM user requestor, street r_street, user done, street d_street
    WHERE requestor.user_id=:requestorId
    AND done.status = '${EUserStatus.done}'
    AND requestor.street_id = r_street.id
    AND done.street_id = d_street.id
    AND ${distance} < :maxDistance
    `;

  const results = await db.raw(sql, {
    requestorId,
    maxDistance,
  });

  return results[0][0].sum;
};
