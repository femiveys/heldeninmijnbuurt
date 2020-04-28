import { useCallback } from "react";
import { store, useTypedStoreon } from "../store";
import { apiCall } from "../axios";
import { TUser } from "../types";

export const useUser = () => {
  const { user, isFetchingUser } = useTypedStoreon("user", "isFetchingUser");

  const fetchUser = useCallback(async () => {
    try {
      store.dispatch("user/isFetchingUser", true);
      const me = await apiCall("GET", "me");
      store.dispatch("user/setUser", me);
      store.dispatch("user/isFetchingUser", false);
    } catch (error) {
      // TODO: Should be removed
      store.dispatch("user/isFetchingUser", false);
    }
  }, []);

  const updateUser = useCallback((fields: Partial<TUser>) => {
    store.dispatch("user/setUser", { ...user, ...fields } as TUser);
  }, []);

  // return useMemo(() => {
  return { fetchUser, isFetchingUser, user, updateUser };
  // }, [fetchUser, isFetchingUser, user]);
};
