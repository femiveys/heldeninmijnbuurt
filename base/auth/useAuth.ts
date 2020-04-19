import { useMemo } from "react";
import { useStoreon } from "storeon/react";

export const useAuth = () => {
  const { fetchingFirebaseUser, firebaseUser, fetchingIdToken } = useStoreon(
    "fetchingFirebaseUser",
    "firebaseUser",
    "fetchingIdToken"
  );

  return useMemo(() => {
    return {
      loggingIn: fetchingFirebaseUser || fetchingIdToken,
      isLoggedIn: !!firebaseUser,
      firebaseUser,
    };
  }, [fetchingFirebaseUser, fetchingIdToken, firebaseUser]);
};
