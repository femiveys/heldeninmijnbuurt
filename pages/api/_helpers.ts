import admin from "firebase-admin";
import { db } from "../../db";
import { initFirebaseAdmin } from "./_firebaseAdmin";
import { TUserFromDb } from "../../apiHelpers/types.db";
import { transformUser } from "../../apiHelpers/transformers";

export async function getFirebaseUser(req) {
  initFirebaseAdmin();
  const idToken = req.headers.authentication;
  const firebaseUser = await admin.auth().verifyIdToken(idToken);
  return firebaseUser;
}

export async function getMe(req) {
  const firebaseUser = await getFirebaseUser(req);
  const me = await db<TUserFromDb>("user")
    .where("user_id", firebaseUser.uid)
    .first();
  return transformUser(me);
}

export async function getMeOrFail(req) {
  const me = getMe(req);
  if (!me) throw new Error("Me not found");
  return me;
}
