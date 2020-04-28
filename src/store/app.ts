import { StoreonModule } from "storeon";
import { TStoreState, TStoreEvents } from "./index";

export type TAppState = {
  isInitialized: boolean;
};

export type TAppEvents = {
  "app/setInitialized": undefined;
};

export const userStore: StoreonModule<TStoreState, TStoreEvents> = (store) => {
  store.on("@init", () => ({
    isInitialized: false,
  }));

  store.on("app/setInitialized", (state) => ({
    ...state,
    isInitialized: true,
  }));
};
