import firebase from "firebase/app";

import { createStoreon } from "storeon";
import { auth } from "./auth";
export const store = createStoreon([auth]);
