import { useTypedStoreon } from "../store";

export const useAuth = () => {
  const {
    fetchingFirebaseUser,
    firebaseUser,
    fetchingIdToken,
  } = useTypedStoreon(
    "fetchingFirebaseUser",
    "firebaseUser",
    "fetchingIdToken"
  );

  // return useMemo(() => {
  return {
    loggingIn: fetchingFirebaseUser || fetchingIdToken,
    isLoggedIn: !!firebaseUser,
    firebaseUser,
  };
  // }, [fetchingFirebaseUser, fetchingIdToken, firebaseUser]);
};
