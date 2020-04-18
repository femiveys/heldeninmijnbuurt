import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

// Initialize Firebase
try {
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
  firebase.analytics();
  firebase.auth().languageCode = "be_NL";
} catch (error) {
  // ...
}

export default firebase;
