import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";
import { TUser } from "../types";

export type TUserState = {
  isFetchingUser: boolean;
  user: TUser | null;
};

export type TUserEvents = {
  "user/isFetchingUser": boolean;
  "user/setUser": TUser | null;
};

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    isFetchingUser: false,
    user: null,
  }));

  store.on("user/setUser", (state, user) => ({
    ...state,
    user,
    isFetchingUser: false,
  }));

  store.on("user/isFetchingUser", (state, isFetchingUser) => ({
    ...state,
    isFetchingUser,
  }));
};
