import { useEffect } from "react";
import FullSpinner from "../components/FullSpinner";
import { useUser, useGoto } from "../hooks";
import { SearchMouthmask } from "../components/SearchMouthmask/SearchMouthmask";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  useEffect(() => {
    if (!(user && user.needsMouthmask)) goto();
  }, [user]);

  return user && user.needsMouthmask ? <SearchMouthmask /> : <FullSpinner />;
};
