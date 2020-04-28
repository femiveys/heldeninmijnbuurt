import admin from "firebase-admin";
import { NextApiRequest } from "next";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import serviceAccount from "../../../mijn-mondmasker-firebase-adminsdk-tjfdw-13a74f43d0.json";
import { TUserFromDb } from "../types.db";

export const initFirebaseAdmin = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
      databaseURL: "https://mijn-mondmasker.firebaseio.com",
    });
  } catch (error) {
    // error
  }
};

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
