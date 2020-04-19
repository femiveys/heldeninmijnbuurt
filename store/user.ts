import { apiCall } from "./../axios";
import { useStoreon } from "storeon/react";
import { useMemo, useCallback } from "react";
import { store } from ".";

export function user(store) {
  store.on("@init", () => ({
    user: undefined,
    fetchingUser: false,
  }));
  store.on("user/setUser", (state, user) => {
    return { ...state, user, fetchingUser: false };
  });
  store.on("user/fetchingUser", (state, fetchingUser) => {
    return { ...state, fetchingUser };
  });
}

export const useUser = () => {
  const { user, fetchingUser } = useStoreon("user", "fetchingUser");

  const refreshUser = useCallback(async () => {
    try {
      const user = await apiCall("GET", "me");
      store.dispatch("user/setUser", user);
    } catch (error) {
      store.dispatch("user/fetchingUser", false);
    }
  }, []);

  return useMemo(() => {
    return { fetchingUser, user, refreshUser };
  }, [refreshUser, fetchingUser, user]);
};
