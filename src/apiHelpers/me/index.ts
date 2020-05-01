import admin from "firebase-admin";
import { NextApiRequest } from "next";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import serviceAccount from "../../../mijn-mondmasker-firebase-adminsdk-tjfdw-13a74f43d0.json";
import { TUserFromDb, TStreetFromDb } from "../types.db";
import { TStreet } from "../../types";

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
  const me = await db<TUserFromDb>("user")
    .join<TStreetFromDb>("street", "user.street_id", "street.id")
    .where("user_id", firebaseUser.uid)
    .first<TUserFromDb>(
      "user.*",
      "street.postal_code",
      "street.street_desc_de",
      "street.street_desc_fr",
      "street.street_desc_nl"
    );
  return transformUserFromDb(me);
}

export async function getMeOrFail(req: NextApiRequest) {
  const me = getMe(req);
  if (!me) throw new Error("Me not found");
  return me;
}
