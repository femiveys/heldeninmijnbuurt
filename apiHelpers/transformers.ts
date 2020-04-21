import humps from "humps";
import { TUserFromDb, TStreetFromDb } from "./types.db";
import { TUser, TStreet } from "../types";

export const makeBooleans = <T>(obj: T, keys: (keyof T)[]) => {
  keys.forEach((key) => {
    // @ts-ignore
    obj[key] = !!obj[key];
  });
  return obj;
};

export const transformUser = (user: TUserFromDb) => {
  const transformedUser = humps.camelizeKeys(user) as TUser;
  return makeBooleans(transformedUser, [
    "isMaker",
    "needsMouthmask",
    "hasMaterial",
  ]);
};

export const transformStreets = (streets: TStreetFromDb[]) =>
  streets.map((street) => humps.camelizeKeys(street) as TStreet);
