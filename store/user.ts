import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";

export type TUser = {
  user_id: string;
  street?: string;
  zipcode?: string;
  has_sewing_machine?: boolean;
  needs_mouthmask?: boolean;
};
export interface IUserState {
  // User
  fetchingUser: boolean;
  user: TUser | null;
}

export interface IUserEvents {
  // User
  "user/fetchingUser": boolean;
  "user/setUser": TUser | null;
}

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    fetchingUser: false,
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
