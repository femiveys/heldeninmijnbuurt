import firebase from "firebase/app";
import "firebase/auth";
import { apiCall } from "../../axios";
import { store } from "../../store";

export const listenToAuthChanges = () => {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      apiCall("POST", "user", { firebase_user_id: firebaseUser.uid });
    }
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
