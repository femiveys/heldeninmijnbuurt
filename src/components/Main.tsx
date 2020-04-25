import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { useEffect } from "react";
import { Spin } from "antd";
import { useAuth, useUser } from "../hooks";

export const Main = () => {
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { refreshUser, fetchingUser, user } = useUser();

  useEffect(() => {
    if (firebaseUser) refreshUser();
  }, [firebaseUser, refreshUser]);

  return !user && fetchingUser ? (
    <div className="centered-spinner">
      <Spin size="large" />
    </div>
  ) : isLoggedIn ? (
    <Dashboard />
  ) : (
    <Login />
  );
};
