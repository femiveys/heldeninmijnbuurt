import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { useAuth, useUser } from "../hooks";
import { FullSpinner } from "./FullSpinner";

export const Main = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { fetchUser } = useUser();

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
      setIsInitialized(true);
    };

    if (!loggingIn) {
      if (firebaseUser) initializeUser();
      else setIsInitialized(true);
    }
  }, [fetchUser, setIsInitialized, loggingIn, firebaseUser]);

  return !isInitialized ? (
    <FullSpinner />
  ) : isLoggedIn ? (
    <Dashboard />
  ) : (
    <Login />
  );
};
