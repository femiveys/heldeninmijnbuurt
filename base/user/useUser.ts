import { useCallback, useMemo } from "react";
import { apiCall } from "../../axios";
import { store, useTypedStoreon } from "../../store";
import { TUser } from "../../types";

export const useUser = () => {
  const { user, fetchingUser } = useTypedStoreon("user", "fetchingUser");

  const refreshUser = useCallback(async () => {
    try {
      const user = await apiCall("GET", "me");
      store.dispatch("user/setUser", user);
    } catch (error) {
      // TODO: Should be removed
      store.dispatch("user/fetchingUser", false);
    }
  }, []);

  const updateUser = useCallback(async (fields: Partial<TUser>) => {
    try {
      await apiCall("PUT", "me", fields);
      store.dispatch("user/setUser", { ...user, ...fields });
    } catch (error) {
      // TODO: Should be removed
      store.dispatch("user/fetchingUser", false);
    }
  }, []);

  return useMemo(() => {
    return { refreshUser, updateUser, fetchingUser, user };
  }, [refreshUser, updateUser, fetchingUser, user]);
};
