import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import Login from "./Login";
import FullSpinner from "./FullSpinner";
import { useAuth, useUser } from "../hooks";
import { subscribeToAuthChanges, initializeFirebaseApp } from "../firebase";

const CONSENT_COOKIE_NAME = "CookieConsent";

const Page: React.FunctionComponent = ({ children }) => {
  const [consent, setConsent] = useState(
    Cookies.get(CONSENT_COOKIE_NAME) === "true"
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { fetchUser } = useUser();

  useEffect(() => {
    initializeFirebaseApp();
  }, []);

  useEffect(() => {
    if (true || consent) {
      const unsubscribe = subscribeToAuthChanges();
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
      setIsInitialized(true);
    };

    if ((true || consent) && !loggingIn) {
      if (firebaseUser) initializeUser();
      else setIsInitialized(true);
    }
  }, [fetchUser, setIsInitialized, loggingIn, firebaseUser]);

  const acceptCookies = useCallback(() => {
    Cookies.set(CONSENT_COOKIE_NAME, "true");
    setConsent(true);
  }, []);

  return (
    <>
      {(true || consent) && !isInitialized ? (
        <FullSpinner />
      ) : isLoggedIn ? (
        children
      ) : (
        <Login consent={consent} acceptCookies={acceptCookies} />
      )}
    </>
  );
};

export default Page;
