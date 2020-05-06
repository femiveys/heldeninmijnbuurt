import { useEffect } from "react";
import { useAuth, useGoto } from "../hooks";
import EnterStreet from "../components/EnterStreet";
import FullSpinner from "../components/FullSpinner";

export default () => {
  const { firebaseUser } = useAuth();
  const goto = useGoto();

  useEffect(() => {
    if (!firebaseUser) goto();
  }, [firebaseUser]);

  return firebaseUser ? <EnterStreet /> : <FullSpinner />;
};
