import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";
import { TUserFromDb } from "../apiHelpers/types.db";

export interface IUserState {
  // User
  fetchingUser: boolean;
  user: TUserFromDb | null;
}

export interface IUserEvents {
  // User
  "user/fetchingUser": boolean;
  "user/setUser": TUserFromDb | null;
}

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    fetchingUser: true,
    user: null,
  }));

  // User
  store.on("user/setUser", (state, user) => {
    return { ...state, user, fetchingUser: false };
  });
  store.on("user/fetchingUser", (state, fetchingUser) => {
    return { ...state, fetchingUser };
  });
};
