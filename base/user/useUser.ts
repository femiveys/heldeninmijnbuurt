import { useCallback, useMemo } from "react";
import { apiCall } from "../../axios";
import { store, useTypedStoreon } from "../../store";

export const useUser = () => {
  const { user, fetchingUser } = useTypedStoreon("user", "fetchingUser");

  const refreshUser = useCallback(async () => {
    try {
      const user = await apiCall("GET", "me");
      store.dispatch("user/setUser", user);
    } catch (error) {
      store.dispatch("user/fetchingUser", false);
    }
  }, []);

  return useMemo(() => {
    return { refreshUser, fetchingUser, user };
  }, [refreshUser, fetchingUser, user]);
};
