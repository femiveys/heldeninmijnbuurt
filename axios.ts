import { sleep } from "./helpers";
import firebase from "firebase/app";
import axios from "axios";
import decode from "jwt-decode";
import { store } from "./store";

export const apiCall = async (
  method: "GET" | "POST" | "DELETE" | "PUT",
  url: string,
  data?: any
) => {
  let idToken = (store.get() as any)?.idToken;

  // Check if ID token should be refreshed
  let shouldRefreshIdToken = false;
  if (!idToken) shouldRefreshIdToken = true;
  if (idToken && Date.now() < decode(idToken).exp * 1000 - 100) {
    shouldRefreshIdToken = true;
  }

  // Refresh ID token first
  if (shouldRefreshIdToken) {
    idToken = await firebase.auth().currentUser?.getIdToken(true);
    store.dispatch("auth/setIdToken", idToken);
  }

  const response = await axios({
    method,
    baseURL: "/api",
    url,
    headers: {
      Authentication: idToken,
    },
    data,
  }).then((resp) => resp.data);

  return response;
};
