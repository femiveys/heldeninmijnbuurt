import { useAuth } from "../base/auth";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";

export const Init = () => {
  const { isLoggedIn, loggingIn } = useAuth();

  return isLoggedIn ? <Dashboard /> : <Login />;
};
