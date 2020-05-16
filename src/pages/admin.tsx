import { useEffect } from "react";
import { useUser, useGoto } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import Page from "../components/Page";
import Admin from "../components/Admin";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  console.log(user);

  useEffect(() => {
    if (user) {
      if (!user.isAdmin) goto();
    }
  }, [user]);

  // return (
  //   <Page>
  //     <Admin />
  //   </Page>
  // );

  return user && user.isAdmin ? (
    <Page>
      <Admin />
    </Page>
  ) : (
    <FullSpinner />
  );
};
