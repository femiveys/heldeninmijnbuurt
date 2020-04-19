import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { storeonDevtools } from "storeon/devtools";

import { authStore, IAuthState, IAuthEvents } from "./auth";
import { userStore, IUserState, IUserEvents } from "./user";

type TState = IAuthState & IUserState;
type TEvents = IAuthEvents & IUserEvents;

export const store = createStoreon<TState, TEvents>([
  authStore,
  userStore,
  process.env.NODE_ENV !== "production" && storeonLogger,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);

export const getStoreValues = () => store.get() as any;
