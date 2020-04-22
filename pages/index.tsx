import { useAuth } from "../base/auth";
import React from "react";
import { Dashboard } from "../components";
import { Login } from "../components/Login";

export default () => {
  const { isLoggedIn, loggingIn } = useAuth();

  return isLoggedIn ? <Dashboard /> : <Login />;
};
