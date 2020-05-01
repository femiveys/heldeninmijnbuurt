import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks";
import EnterStreet from "../components/EnterStreet";
import FullSpinner from "../components/FullSpinner";

export default () => {
  const { firebaseUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firebaseUser) router.replace("/");
  }, [firebaseUser]);

  return firebaseUser ? <EnterStreet /> : <FullSpinner />;
};
