import { useEffect } from "react";
import { useUser, useGoto } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import { MakeMouthmask } from "../components/MakeMouthmask/MakeMouthmask";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  useEffect(() => {
    if (!(user && user.isMaker)) goto();
  }, [user]);

  return user && user.isMaker ? <MakeMouthmask /> : <FullSpinner />;
};
