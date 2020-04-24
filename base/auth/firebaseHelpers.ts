import firebase from "firebase/app";
import "firebase/auth";
import { store } from "../../store";

export const listenToAuthChanges = () => {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    store.dispatch("auth/setFirebaseUser", firebaseUser);
    refreshIdToken();
  });
};

export const refreshIdToken = () => {
  try {
    const firebaseUser = firebase.auth().currentUser;
    firebaseUser?.getIdToken(true).then(function (idToken) {
      store.dispatch("auth/setIdToken", idToken);
    });
  } catch (error) {
    store.dispatch("auth/setIdToken", null);
  }
};
