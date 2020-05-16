import { useEffect } from "react";
import EnterStreet from "../components/EnterStreet";
import { useUser, useGoto } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import Choice from "../components/Choice";
import { EUserStatus } from "../types";

export default () => {
  const { user } = useUser();
  const goto = useGoto();

  console.log("index");

  useEffect(() => {
    if (user) {
      if (user.isMaker) goto("/superhero");
      else if (user.status === EUserStatus.active && user.needsMouthmask)
        goto("/searching");
      else if (!user.streetId) goto("/new");
    }
  }, [user]);

  // We show a full spinner while redirecting (see above)
  return user ? (
    user.isMaker ||
    (user.status === EUserStatus.active && user.needsMouthmask) ||
    !user.streetId ? (
      <FullSpinner />
    ) : (
      <Choice />
    )
  ) : (
<<<<<<< Updated upstream
    <EnterStreet />
=======
    <Page tt="hdfksfdjk">
      <EnterStreet />
    </Page>
>>>>>>> Stashed changes
  );
};
