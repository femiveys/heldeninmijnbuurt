// Firebase Admin
import admin from "firebase-admin";
import serviceAccount from "../../mijn-mondmasker-firebase-adminsdk-tjfdw-13a74f43d0.json";

export function initFirebaseAdmin() {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
      databaseURL: "https://mijn-mondmasker.firebaseio.com",
    });
  } catch (error) {
    // error
  }
}
