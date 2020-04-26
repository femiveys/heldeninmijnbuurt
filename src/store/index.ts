import { useStoreon } from "storeon/react";
import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { storeonDevtools } from "storeon/devtools";
import { TAuthEvents, TAuthState, authStore } from "./auth";
import { TUserState, TUserEvents, userStore } from "./user";
import { TAppState, TAppEvents } from "./app";
import { IS_DEV } from "../helpers";

export type TStoreState = TAuthState & TUserState & TAppState;
export type TStoreEvents = TAuthEvents & TUserEvents & TAppEvents;

export const store = createStoreon<TStoreState, TStoreEvents>([
  authStore,
  userStore,
  // IS_DEV && storeonLogger,
  IS_DEV && storeonDevtools,
]);

export const useTypedStoreon = (...keys: (keyof TStoreState)[]) =>
  useStoreon<TStoreState, TStoreEvents>(...keys);
