import { createStoreon } from "storeon";
import { storeonLogger } from "storeon/devtools";
import { storeonDevtools } from "storeon/devtools";

import { auth } from "./auth";
import { user } from "./user";

export const store = createStoreon([
  auth,
  user,
  process.env.NODE_ENV !== "production" && storeonLogger,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);

export const getStoreValues = () => store.get() as any;
