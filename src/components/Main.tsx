import { useEffect, useState } from "react";
import Login from "./Login";
import FullSpinner from "./FullSpinner";
import { useAuth, useUser } from "../hooks";

const Main: React.FunctionComponent = ({ children }) => {
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

  return (
    <>{!isInitialized ? <FullSpinner /> : isLoggedIn ? children : <Login />}</>
  );
};

export default Main;
