import { useStoreon } from "storeon/react";
import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { storeonDevtools } from "storeon/devtools";
import { TAuthEvents, TAuthState, authStore } from "./auth";
import { TUserState, TUserEvents, userStore } from "./user";

export type TStoreState = TAuthState & TUserState;
export type TStoreEvents = TAuthEvents & TUserEvents;

export const store = createStoreon<TStoreState, TStoreEvents>([
  authStore,
  userStore,
  // process.env.NODE_ENV !== "production" && storeonLogger,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);

export const useTypedStoreon = (...keys: (keyof TStoreState)[]) =>
  useStoreon<TStoreState, TStoreEvents>(...keys);
