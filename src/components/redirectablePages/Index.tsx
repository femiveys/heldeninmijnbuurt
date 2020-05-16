import { useEffect } from "react";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { EUserStatus } from "../../types";
import Choice from "../Choice";

const Index = () => {
  const goto = useGoto();
  const { user } = useUser();

  const isMaker = user.isMaker;
  const isActiveRequestor =
    user.status === EUserStatus.active && user.needsMouthmask;

  useEffect(() => {
    if (isMaker) goto("/superhero");
    else if (isActiveRequestor) goto("/searching");
  }, [user]);

  // We show a FullSpinner while redirecting
  return isMaker ? (
    <FullSpinner tip="Dashboard voor superhelden aan het laden..." />
  ) : isActiveRequestor ? (
    <FullSpinner tip="We helpen je mondmaskers zoeken..." />
  ) : (
    <Choice />
  );
};

export default Index;
