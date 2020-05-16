import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";
import { TUser } from "../types";

export type TUserState = {
  isFetchingUser: boolean;
  user: TUser;
};

export type TUserEvents = {
  "user/isFetchingUser": boolean;
  "user/setUser": TUser;
  "user/reset": void;
};

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    isFetchingUser: false,
    // @ts-ignore I know what I'm doing
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

  store.on("user/reset", (state) => ({
    ...state,
    // @ts-ignore I know what I'm doing
    user: null,
  }));
};
