import firebase from "firebase/app";
import axios, { AxiosRequestConfig } from "axios";
import * as decode from "jwt-decode";
import { store } from "./store";

export type TApiMethod = "GET" | "POST" | "DELETE" | "PUT";

export const apiCall = async (
  method: TApiMethod,
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  let idToken = store.get().idToken;

  // Check if ID token should be refreshed
  let shouldRefreshIdToken = false;
  if (!idToken) {
    shouldRefreshIdToken = true;
  } else {
    const decodedToken = (decode as any)(idToken);
    const exp = decodedToken.exp * 1000;
    const now = Date.now();
    // Expire 15 minutes before real expiry date
    if (now > exp - 15 * 60) {
      shouldRefreshIdToken = true;
    }
  }

  // Refresh ID token first
  if (shouldRefreshIdToken) {
    idToken = (await firebase.auth().currentUser?.getIdToken(true)) || null;
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
    ...config,
  }).then((resp) => resp.data);

  return response;
};
