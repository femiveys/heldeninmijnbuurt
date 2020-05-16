import { useEffect } from "react";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { MakeMouthmask } from "../MakeMouthmask/MakeMouthmask";

export default () => {
  const goto = useGoto();
  const { user } = useUser();

  useEffect(() => {
    if (!user.isMaker) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.isMaker ? (
    <FullSpinner tip="Je maakt geen mondmaskers" />
  ) : (
    <MakeMouthmask />
  );
};
