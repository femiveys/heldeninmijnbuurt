import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { store } from "./store";

export const initializeFirebaseApp = () => {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCfiofDaFSGHSfweyWsBJaOKfVH3HFhJjQ",
        authDomain: "mijn-mondmasker.firebaseapp.com",
        databaseURL: "https://mijn-mondmasker.firebaseio.com",
        projectId: "mijn-mondmasker",
        storageBucket: "mijn-mondmasker.appspot.com",
        messagingSenderId: "788356512292",
        appId: "1:788356512292:web:e5707021e7e1a958ab76b1",
        measurementId: "G-2YT6H62Y2M",
      });
    }
  } catch (error) {
    console.log("Error initializing Firebase app", error);
    // ...
  }

  // firebase.analytics();
  firebase.auth().languageCode = "nl";
};

export const subscribeToAuthChanges = () =>
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    // console.log(firebaseUser);
    store.dispatch("auth/setFirebaseUser", firebaseUser);
    refreshIdToken();
  });

const refreshIdToken = () => {
  try {
    const firebaseUser = firebase.auth().currentUser;
    firebaseUser?.getIdToken(true).then((idToken) => {
      store.dispatch("auth/setIdToken", idToken);
    });
  } catch (error) {
    store.dispatch("auth/setIdToken", null);
  }
};
