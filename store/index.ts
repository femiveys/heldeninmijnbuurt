import { createStoreon } from "storeon";
import { auth } from "./auth";
export const store = createStoreon([auth]);
