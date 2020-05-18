import admin from "firebase-admin";
import { NextApiRequest } from "next";
import { db } from "../../db";
import { transformUserFromDb } from "../transformers";
import serviceAccount from "../../../mijn-mondmasker-firebase-adminsdk-tjfdw-13a74f43d0.json";
import { TUserFromDb, TStreetFromDb, TRelationFromDb } from "../types.db";
import { TUser } from "../../types";
import { pick, Dictionary } from "lodash";

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
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return await admin.auth().getUser(decodedToken.uid);
}

export async function getMe(userId: string) {
  // Set last_access_date
  await db<TUserFromDb>("user")
    .where("user_id", userId)
    .update({ last_access_date: new Date() });

  // Get user
  const me = await db<TUserFromDb>("user")
    .join<TStreetFromDb>("street", "user.street_id", "street.id")
    .where("user_id", userId)
    .first<TUserFromDb>(
      "user.*",
      "street.postal_code",
      "street.street_desc_de",
      "street.street_desc_fr",
      "street.street_desc_nl"
    );
  return transformUserFromDb(me);
}

export async function getMeOrFail(userId: string) {
  const me = getMe(userId);
  if (!me) throw new Error("Me not found");
  return me;
}

export const getRealUserId = async (firebaseUser: admin.auth.UserRecord) => {
  const mapping: Dictionary<string> = {
    "google.com": "google",
    "facebook.com": "facebook",
  };
  const { providerId, uid, email } = firebaseUser.providerData[0];
  // For google in firebaseUser.email, For facebook in providerData
  const userIdByEmail = await getUserIdFromDbByEmail(
    firebaseUser.email || email
  );
  return userIdByEmail || mapping[providerId] + "-oauth2|" + uid;
};

// Gets the user_id or the mocked user_id if the user has the mocked_user_id filled
export const getUserId = async (req: NextApiRequest) => {
  const firebaseUser = await getFirebaseUser(req);

  const userId = await getRealUserId(firebaseUser);

  await migrateFromFirebaseUidtoGoogleUid(firebaseUser.uid, userId);

  const user = await db<TUserFromDb>("user")
    .where({ user_id: userId })
    .first("mocked_user_id");

  return {
    userId: user && user.mocked_user_id ? user.mocked_user_id : userId,
    realUserId: userId,
  };
};

const getUserIdFromDbByEmail = async (email?: string) => {
  const user = await db<TUserFromDb>("user").where({ email }).first("user_id");
  return user && user.user_id;
};

const migrateFromFirebaseUidtoGoogleUid = async (
  firebaseUid: string,
  userId: string
) => {
  const user = await db<TUserFromDb>("user")
    .where({ user_id: firebaseUid })
    .first();

  // If a user exists with old firebase ids, replace user and relations by googleIds
  if (user) {
    // Update user_id on user
    await db<TUserFromDb>("user")
      .where("user_id", firebaseUid)
      .update({ user_id: userId });

    // Update mocked_user_id on user
    await db<TUserFromDb>("user")
      .where("mocked_user_id", firebaseUid)
      .update({ mocked_user_id: userId });

    // Update hero relations
    await db<TRelationFromDb>("relation")
      .where("hero_id", firebaseUid)
      .update({ hero_id: userId });

    // Update requestor relations
    await db<TRelationFromDb>("relation")
      .where("requestor_id", firebaseUid)
      .update({ requestor_id: userId });
  }
};

/**
 * Updates a limited amount of fields of the current user.
 *
 * @param userId
 * @returns 1 if updated, 0 otherwise
 */
export const updateMe = async (userId: string, fields: Partial<TUser>) => {
  const result = await db<TUserFromDb>("user")
    .where({ user_id: userId })
    .update(pick(fields, "name", "whatsapp"));

  return result;
};
