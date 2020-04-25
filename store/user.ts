import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";
import { TUser } from "../types";

export type TUserState = {
  fetchingUser: boolean;
  user: TUser | null;
};

export type TUserEvents = {
  "user/fetchingUser": boolean;
  "user/setUser": TUser | null;
};

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    fetchingUser: false,
    user: null,
  }));

  store.on("user/setUser", (state, user) => ({
    ...state,
    user,
    fetchingUser: false,
  }));

  store.on("user/fetchingUser", (state, fetchingUser) => ({
    ...state,
    fetchingUser,
  }));
};
