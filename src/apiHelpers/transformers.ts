import humps from "humps";
import {
  TUserFromDb,
  TStreetFromDb,
  TRelationFromDb,
  TShortStreetFromDb,
  TUserAndDistanceFromDb,
  TFullRelationFromDb,
} from "./types.db";
import { TUser, TStreet, TRelation, TUserAndDistance } from "../types";
import { Dictionary, filter, pickBy } from "lodash";

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
) => streets.map(transformStreetFromDb);

export const transformStreetFromDb = (
  street: TShortStreetFromDb | TStreetFromDb
) => humps.camelizeKeys(street) as TStreet;

export const transformUserFromDb = <
  T extends TUserFromDb | TUserAndDistanceFromDb
>(
  user?: T
) => {
  type TRet = T extends TUserAndDistanceFromDb ? TUserAndDistance : TUser;
  if (!user) return null;
  const transformedUser = humps.camelizeKeys(user) as TRet;
  return makeBooleans(transformedUser, [
    "isMaker",
    "needsMouthmask",
    "isAdmin",
    "isTester",
  ]);
};

export const transformRelationFromDb = (relation?: TRelationFromDb) =>
  relation ? (humps.camelizeKeys(relation) as TRelation) : null;

// Transformers from App to DB
export const transformObjectToDb = (o: Dictionary<any>) => {
  // Make integers of booleans
  Object.keys(o).forEach((key) => {
    if (typeof o[key] === "boolean") o[key] = o[key] ? 1 : 0;
  });

  // Snakecase all keys
  return humps.decamelizeKeys(o);
};

const groupByPrefix = (prefix: string, obj: Dictionary<any>) => {
  const withPrefix = pickBy(obj, (_, key) => key.startsWith(prefix));
  Object.keys(withPrefix).forEach((key) => {
    const newKey = key.substring(prefix.length + 1);
    console.log(newKey);
    withPrefix[newKey] = withPrefix[key];
    delete withPrefix[key];
  });
  return withPrefix;
};

export const transformFullRelationFromDb = (fullRelation: object) => {
  const result = {
    hero: transformUserFromDb(
      groupByPrefix("hero", fullRelation) as TUserFromDb
    ),
    heroStreet: transformStreetFromDb(
      groupByPrefix("hstreet", fullRelation) as TStreetFromDb
    ),
    requestor: transformUserFromDb(
      groupByPrefix("requestor", fullRelation) as TUserFromDb
    ),
    requestorStreet: transformStreetFromDb(
      groupByPrefix("rstreet", fullRelation) as TStreetFromDb
    ),
    relation: transformRelationFromDb(
      groupByPrefix("relation", fullRelation) as TRelationFromDb
    ),
  };

  return result;
};
