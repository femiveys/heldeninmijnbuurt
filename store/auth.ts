import { User as FirebaseUser } from "firebase";
import "firebase/auth";
import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";

export interface IAuthState {
  // Auth
  fetchingFirebaseUser: boolean;
  firebaseUser: null | FirebaseUser;
  fetchingIdToken: boolean;
  idToken: string | null;
}

export interface IAuthEvents {
  // Auth
  "auth/setFirebaseUser": FirebaseUser | null;
  "auth/setIdToken": string | null;
  "auth/fetchingIdToken": boolean;
}

export const authStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    // Auth
    fetchingFirebaseUser: true,
    firebaseUser: null,
    fetchingIdToken: false,
    idToken: null,
  }));

  // Auth
  store.on("auth/setFirebaseUser", (state, firebaseUser) => {
    return { ...state, firebaseUser, fetchingFirebaseUser: false };
  });
  store.on("auth/setIdToken", (state, idToken) => {
    return { ...state, idToken };
  });
  store.on("auth/fetchingIdToken", (state, fetchingIdToken) => {
    return { ...state, fetchingIdToken };
  });
};
