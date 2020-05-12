import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import Login from "./Login";
import Cookie from "./Cookie";
import FullSpinner from "./FullSpinner";
import { useAuth, useUser } from "../hooks";
import { subscribeToAuthChanges } from "../firebase";

const CONSENT_COOKIE_NAME = "CookieConsent";

const Page: React.FunctionComponent = ({ children }) => {
  const [consent, setConsent] = useState(
    Cookies.get(CONSENT_COOKIE_NAME) === "true"
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { fetchUser } = useUser();

  useEffect(() => {
    if (consent) {
      const unsubscribe = subscribeToAuthChanges();
      return unsubscribe;
    }
  }, [consent]);

  useEffect(() => {
    const initializeUser = async () => {
      await fetchUser();
      setIsInitialized(true);
    };

    if (consent && !loggingIn) {
      if (firebaseUser) initializeUser();
      else setIsInitialized(true);
    }
  }, [consent, fetchUser, setIsInitialized, loggingIn, firebaseUser]);

  const acceptCookies = useCallback(() => {
    Cookies.set(CONSENT_COOKIE_NAME, "true");
    setConsent(true);
  }, []);

  return (
    <>
      {consent && !isInitialized ? (
        <FullSpinner />
      ) : (
        <>
          {isLoggedIn ? (
            <>
              {children}
              {!consent && <Cookie acceptCookies={acceptCookies} />}
            </>
          ) : (
            <Login consent={consent} acceptCookies={acceptCookies} />
          )}
        </>
      )}
    </>
  );
};

export default Page;
