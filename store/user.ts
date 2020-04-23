import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";
import { TUser } from "../types";

export type TUserState = {
  fetchingUser: boolean;
  user?: TUser;
};

export type TUserEvents = {
  "user/fetchingUser": boolean;
  "user/setUser"?: TUser;
};

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    fetchingUser: true,
    user: null,
  }));

  store.on("user/setUser", (state, user) => {
    return { ...state, user, fetchingUser: false };
  });
  store.on("user/fetchingUser", (state, fetchingUser) => {
    return { ...state, fetchingUser };
  });
};
