import admin from "firebase-admin";
import { db } from "../../db";
import { TUserFromDb } from "../../apiHelpers/types.db";
import { transformUser } from "../../apiHelpers/transformers";
import { initFirebaseAdmin } from "./firebaseAdmin";

export async function getFirebaseUser(req) {
  initFirebaseAdmin();
  const idToken = req.headers.authentication;
  const firebaseUser = await admin.auth().verifyIdToken(idToken);
  return firebaseUser;
}

export async function getMe(req) {
  const firebaseUser = await getFirebaseUser(req);
  const me = await db("user")
    .where("user_id", firebaseUser.uid)
    .first<TUserFromDb>();
  return transformUser(me);
}

export async function getMeOrFail(req) {
  const me = getMe(req);
  if (!me) throw new Error("Me not found");
  return me;
}
