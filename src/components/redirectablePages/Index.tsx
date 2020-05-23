import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { EUserStatus } from "../../types";
import Choice from "../Choice";

const Index = () => {
  const goto = useGoto();
  const { user } = useUser();
  const { t } = useTranslation();

  const isMaker = user.isMaker;
  const isActiveRequestor =
    user.status === EUserStatus.active && user.needsMouthmask;

  useEffect(() => {
    if (isMaker) goto("/superhero");
    else if (isActiveRequestor) goto("/searching");
  }, [user]);

  // We show a FullSpinner while redirecting
  return isMaker ? (
    <FullSpinner tip={t("redirect.superhero")} />
  ) : isActiveRequestor ? (
    <FullSpinner tip={t("redirect.searching")} />
  ) : (
    <Choice />
  );
};

export default Index;
