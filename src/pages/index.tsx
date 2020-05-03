import { useEffect } from "react";
import { useRouter } from "next/router";
import EnterStreet from "../components/EnterStreet";
import { useUser } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import Choice from "../components/Choice";
import { EUserStatus } from "../types";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.isMaker) router.replace("/superhero");
      else if (user.status === EUserStatus.active && user.needsMouthmask)
        router.replace("/searching");
      else if (!user.streetId) router.replace("/new");
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
    <EnterStreet />
  );
};
