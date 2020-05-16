import { useEffect } from "react";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { SearchMouthmask } from "../SearchMouthmask/SearchMouthmask";

export default () => {
  const goto = useGoto();
  const { user } = useUser();

  useEffect(() => {
    if (!user.needsMouthmask) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.needsMouthmask ? (
    <FullSpinner tip="Je hebt geen mondmaskers nodig" />
  ) : (
    <SearchMouthmask />
  );
};
