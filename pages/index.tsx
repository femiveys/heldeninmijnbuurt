import { useAuth } from "../base/auth";
import React, { useEffect } from "react";
import { Dashboard } from "../components";
import { Login } from "../components/Login";
import { useTranslation } from "../i18n";

export default () => {
  const { i18n } = useTranslation("common");

  // This is a workaround because fore some reason the language is not picked up
  useEffect(() => {
    i18n.init();
  }, []);

  const { isLoggedIn, loggingIn } = useAuth();

  return isLoggedIn ? <Dashboard /> : <Login />;
};
