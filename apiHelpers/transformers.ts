import humps from "humps";
import { TUserFromDb, TStreetFromDb, TRelationFromDb } from "./types.db";
import { TUser, TStreet, TRelation } from "../types";

export const makeBooleans = <T>(obj: T, keys: (keyof T)[]) => {
  keys.forEach((key) => {
    // @ts-ignore
    obj[key] = !!obj[key];
  });
  return obj;
};

export const transformStreets = (streets: TStreetFromDb[]) =>
  streets.map((street) => humps.camelizeKeys(street) as TStreet);

export const transformUser = (user?: TUserFromDb) => {
  if (!user) return null;
  const { __name, __email, ...userWithout__ } = user;
  const transformedUser = humps.camelizeKeys(userWithout__) as TUser;
  return makeBooleans(transformedUser, [
    "isMaker",
    "needsMouthmask",
    "hasMaterial",
  ]);
};

export const transformRelation = (relation: TRelationFromDb) =>
  humps.camelizeKeys(relation) as TRelation;
