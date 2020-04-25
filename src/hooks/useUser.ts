import { useCallback, useMemo, useState } from "react";
import { store, useTypedStoreon } from "../store";
import { apiCall } from "../axios";
import { TUser } from "../types";

export const useUser = () => {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const { user, fetchingUser } = useTypedStoreon("user", "fetchingUser");

  const refreshUser = useCallback(async () => {
    try {
      const me = await apiCall("GET", "me");
      store.dispatch("user/setUser", me);
    } catch (error) {
      // TODO: Should be removed
      store.dispatch("user/fetchingUser", false);
    }
  }, []);

  const updateUser = useCallback(
    async (fields: Partial<TUser>) => {
      try {
        setIsUpdatingUser(true);
        await apiCall("PUT", "me", fields);
        store.dispatch("user/setUser", { ...user, ...fields });
        setIsUpdatingUser(false);
      } catch (error) {
        // TODO: Should be removed
        store.dispatch("user/fetchingUser", false);
      }
    },
    [user]
  );

  return useMemo(() => {
    return { refreshUser, updateUser, fetchingUser, isUpdatingUser, user };
  }, [refreshUser, updateUser, fetchingUser, isUpdatingUser, user]);
};
