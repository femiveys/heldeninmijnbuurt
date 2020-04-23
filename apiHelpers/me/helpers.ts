import admin from "firebase-admin";
import { db } from "../../db";
import { TUserFromDb } from "../../apiHelpers/types.db";
import {
  transformUserFromDb,
  transformObjectToDb,
} from "../../apiHelpers/transformers";
import { initFirebaseAdmin } from "./firebaseAdmin";
import { NextApiRequest } from "next";
import { TUser } from "../../types";

export async function getFirebaseUser(req: NextApiRequest) {
  initFirebaseAdmin();
  const idToken = req.headers.authentication as string;
  const firebaseUser = await admin.auth().verifyIdToken(idToken);
  return firebaseUser;
}

export async function getMe(req: NextApiRequest) {
  const firebaseUser = await getFirebaseUser(req);
  const me = await db("user")
    .where("user_id", firebaseUser.uid)
    .first<TUserFromDb>();
  return transformUserFromDb(me);
}

export async function getMeOrFail(req: NextApiRequest) {
  const me = getMe(req);
  if (!me) throw new Error("Me not found");
  return me;
}

export const updateUser = async (userId: string, fields: Partial<TUser>) =>
  await db("user").where("user_id", userId).update(transformObjectToDb(fields));
