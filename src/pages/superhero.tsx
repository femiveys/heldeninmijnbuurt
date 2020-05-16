import { useEffect } from "react";
import { useUser, useGoto } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import { MakeMouthmask } from "../components/MakeMouthmask/MakeMouthmask";
import Page from "../components/Page";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  useEffect(() => {
    if (!(user && user.isMaker)) goto();
  }, [user]);

  return user && user.isMaker ? (
    <Page>
      <MakeMouthmask />
    </Page>
  ) : (
    <FullSpinner />
  );
};
