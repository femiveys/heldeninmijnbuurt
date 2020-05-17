import { User } from "firebase/app";
import "firebase/auth";
import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";

export type TAuthState = {
  fetchingFirebaseUser: boolean;
  firebaseUser: User | null;
  fetchingIdToken: boolean;
  idToken: string | null;
};

export type TAuthEvents = {
  "auth/setFirebaseUser": User | null;
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

  store.on("auth/setFirebaseUser", (state, firebaseUser) => ({
    ...state,
    firebaseUser,
    fetchingFirebaseUser: false,
  }));

  store.on("auth/setIdToken", (state, idToken) => ({
    ...state,
    idToken,
  }));

  store.on("auth/fetchingIdToken", (state, fetchingIdToken) => ({
    ...state,
    fetchingIdToken,
  }));
};
