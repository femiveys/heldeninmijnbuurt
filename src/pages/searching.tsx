import { useEffect } from "react";
import FullSpinner from "../components/FullSpinner";
import { useUser, useGoto } from "../hooks";
import { SearchMouthmask } from "../components/SearchMouthmask/SearchMouthmask";
import Page from "../components/Page";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  console.log("user", user);

  // useEffect(() => {
  //   if (!(user && user.needsMouthmask)) goto();
  // }, [user]);

  return user && user.needsMouthmask ? (
    <Page>
      <SearchMouthmask />
    </Page>
  ) : (
    <FullSpinner />
  );
};
