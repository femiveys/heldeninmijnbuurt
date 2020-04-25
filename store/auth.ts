import { User as FirebaseUser } from "firebase/app";
import "firebase/auth";
import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";

export type TAuthState = {
  fetchingFirebaseUser: boolean;
  firebaseUser: FirebaseUser | null;
  fetchingIdToken: boolean;
  idToken: string | null;
};

export type TAuthEvents = {
  "auth/setFirebaseUser": FirebaseUser | null;
  "auth/setIdToken": string | null;
  "auth/fetchingIdToken": boolean;
};

export const authStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    fetchingFirebaseUser: true,
    firebaseUser: null,
    fetchingIdToken: false,
    idToken: null,
  }));

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
