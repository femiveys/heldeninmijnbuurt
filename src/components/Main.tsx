import { useEffect, useState } from "react";
import { Spin } from "antd";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { useAuth, useUser } from "../hooks";

export const Main = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { refreshUser, user } = useUser();

  useEffect(() => {
    const initializeUser = async () => {
      await refreshUser();
      setIsInitialized(true);
    };

    if (!loggingIn) {
      if (firebaseUser) initializeUser();
      else setIsInitialized(true);
    }
  }, [refreshUser, setIsInitialized, loggingIn, firebaseUser]);

  return !isInitialized ? (
    <div className="centered-spinner">
      <Spin size="large" />
    </div>
  ) : isLoggedIn ? (
    <Dashboard />
  ) : (
    <Login />
  );
};
