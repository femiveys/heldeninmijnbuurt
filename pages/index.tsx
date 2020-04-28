import React from "react";

import { StoreContext } from "storeon/react";
import { store } from "../src/store";
import { App } from "../src/components/App";
import { initializeFirebaseApp } from "../src/firebase";

initializeFirebaseApp();

export default () => (
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
