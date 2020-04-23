import humps from "humps";
import {
  TUserFromDb,
  TStreetFromDb,
  TRelationFromDb,
  TShortStreetFromDb,
} from "./types.db";
import { TUser, TStreet, TRelation } from "../types";

// Transformers from DB to App
export const makeBooleans = <T>(obj: T, keys: (keyof T)[]) => {
  keys.forEach((key) => {
    // @ts-ignore
    obj[key] = !!obj[key];
  });
  return obj;
};

export const transformStreetsFromDb = (
  streets: (TShortStreetFromDb | TStreetFromDb)[]
) => streets.map((street) => humps.camelizeKeys(street) as TStreet);

export const transformUserFromDb = (user?: TUserFromDb) => {
  if (!user) return null;
  const { __name, __email, ...userWithout__ } = user;
  const transformedUser = humps.camelizeKeys(userWithout__) as TUser;
  return makeBooleans(transformedUser, [
    "isMaker",
    "needsMouthmask",
    "hasMaterial",
  ]);
};

export const transformRelationFromDb = (relation?: TRelationFromDb) =>
  relation ? (humps.camelizeKeys(relation) as TRelation) : null;

// Transformers from App to DB
export const transformObjectToDb = (o: object) => {
  // Make integers of booleans
  Object.keys(o).forEach((key) => {
    if (typeof o[key] === "boolean") o[key] = o[key] ? 1 : 0;
  });

  // Snakecase all keys
  return humps.decamelizeKeys(o);
};