import { useEffect } from "react";
// import Cookies from "js-cookie";
import Login from "./Login";
import FullSpinner from "./FullSpinner";
import { useAuth, useUser } from "../hooks";
import { subscribeToAuthChanges, initializeFirebaseApp } from "../firebase";
import EnterStreet from "./EnterStreet";

// const CONSENT_COOKIE_NAME = "CookieConsent";

const consent = true;
const acceptCookies = () => {};

const Gate: React.FunctionComponent = ({ children }) => {
  // const [consent, setConsent] = useState(
  //   Cookies.get(CONSENT_COOKIE_NAME) === "true"
  // );
  const { firebaseUser, isLoggedIn, loggingIn } = useAuth();
  const { user, fetchUser, isFetchingUser } = useUser();

  useEffect(() => {
    initializeFirebaseApp();
  }, []);

  useEffect(() => {
    if (consent) {
      const unsubscribe = subscribeToAuthChanges();
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (consent && firebaseUser) fetchUser();
  }, [consent, firebaseUser]);

  // const acceptCookies = useCallback(() => {
  //   Cookies.set(CONSENT_COOKIE_NAME, "true");
  //   setConsent(true);
  // }, []);

  return (
    <>
      {consent ? (
        loggingIn ? (
          <FullSpinner />
        ) : isLoggedIn ? (
          isFetchingUser ? (
            <FullSpinner tip="Je gegevens aan het ophalen..." />
          ) : user ? (
            children
          ) : (
            <EnterStreet />
          )
        ) : (
          <Login consent={consent} acceptCookies={acceptCookies} />
        )
      ) : (
        <div>no idea what to do here</div>
      )}
    </>
  );
};

export default Gate;
