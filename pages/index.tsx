import "../firebase";

import React from "react";

import { StoreContext } from "storeon/react";
import { store } from "../store";
import { AppLayout } from "../components/AppLayout";
import { listenToAuthChanges } from "../base/auth";

// Listen to firebase auth changes
listenToAuthChanges();

export default () => (
  <StoreContext.Provider value={store}>
    <AppLayout />
  </StoreContext.Provider>
);
