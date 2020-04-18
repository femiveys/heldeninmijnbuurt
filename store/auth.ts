import { axiosInstance } from "../axios";
import { IS_CLIENT } from "../helpers";
import { StoreonStore } from "storeon";

export function auth(store: StoreonStore<any>) {
  store.on("@init", () => ({
    checkingUser: true,
    idToken: null,
    fetchingUser: false,
    user: null,
  }));

  store.on("auth/checking", (state) => {
    return { ...state, checkingUser: true };
  });

  store.on("auth/checked", (state) => {
    return { ...state, checkingUser: false };
  });

  store.on("auth/token", (state, idToken) => {
    return { ...state, idToken };
  });

  store.on("auth/fetchingUser", (state, fetchingUser) => {
    return { ...state, fetchingUser };
  });
  store.on("auth/setUser", (state, user) => {
    if (IS_CLIENT) {
      // if (user) {
      //   Router.replace("/dashboard");
      // } else {
      //   Router.replace("/");
      // }
    }
    return { ...state, user };
  });
  store.on("auth/fetchUser", async (state) => {
    try {
      store.dispatch("auth/fetchingUser", true);
      const me = await axiosInstance
        .get("/api/me", {
          headers: {
            Authentication: state.idToken,
          },
        })
        .then((resp) => resp.data);
      if (!me) throw new Error("Could not fetch user");
      store.dispatch("auth/setUser", me);
    } catch (error) {
      // error
      console.log({ error });
    }
    store.dispatch("auth/fetchingUser", false);
  });
}
