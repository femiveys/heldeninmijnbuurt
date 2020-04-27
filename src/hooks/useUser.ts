import { useCallback, useState } from "react";
import { store, useTypedStoreon } from "../store";
import { apiCall } from "../axios";
import { TUser } from "../types";

export const useUser = () => {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
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

  const updateUser = useCallback(
    async (fields: Partial<TUser>) => {
      try {
        setIsUpdatingUser(true);
        await apiCall("PUT", "me", fields);
        store.dispatch("user/setUser", { ...user, ...fields } as TUser);
        setIsUpdatingUser(false);
      } catch (error) {
        // TODO: Should be removed
        store.dispatch("user/isFetchingUser", false);
      }
    },
    [user]
  );

  // return useMemo(() => {
  return { fetchUser, isFetchingUser, updateUser, isUpdatingUser, user };
  // }, [fetchUser, updateUser, isFetchingUser, isUpdatingUser, user]);
};
