import { useStoreon } from "storeon/react";
import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { storeonDevtools } from "storeon/devtools";
import { IAuthEvents, IAuthState, authStore } from "./auth";
import { IUserState, IUserEvents, userStore } from "./user";

export type TStoreState = IAuthState & IUserState;
export type TStoreEvents = IAuthEvents & IUserEvents;

export const store = createStoreon<TStoreState, TStoreEvents>([
  authStore,
  userStore,
  // process.env.NODE_ENV !== "production" && storeonLogger,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);

export const useTypedStoreon = (...keys: (keyof TStoreState)[]) =>
  useStoreon<TStoreState, TStoreEvents>(...keys);
