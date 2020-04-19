import firebase from "firebase/app";
import { useStoreon } from "storeon/react";
import { useMemo } from "react";
import { store, getStoreValues } from "./index";

export function auth(store) {
  store.on("@init", () => ({
    fetchingFirebaseUser: true,
    firebaseUser: undefined,
    fetchingIdToken: false,
    idToken: undefined,
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
}

export const useAuth = () => {
  const { fetchingFirebaseUser, firebaseUser, fetchingIdToken } = useStoreon(
    "fetchingFirebaseUser",
    "firebaseUser",
    "fetchingIdToken"
  );

  return useMemo(() => {
    return {
      loggingIn: fetchingFirebaseUser || fetchingIdToken,
      isLoggedIn: !!firebaseUser,
      firebaseUser,
    };
  }, [fetchingFirebaseUser, fetchingIdToken, firebaseUser]);
};

export const listenToAuthChanges = () => {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    store.dispatch("auth/setFirebaseUser", firebaseUser);
    refreshIdToken();
  });
};

export const refreshIdToken = () => {
  try {
    const firebaseUser = firebase.auth().currentUser;
    firebaseUser.getIdToken(true).then(function (idToken) {
      store.dispatch("auth/setIdToken", idToken);
    });
  } catch (error) {
    store.dispatch("auth/setIdToken", null);
  }
};
