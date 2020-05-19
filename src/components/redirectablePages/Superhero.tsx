import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { MakeMouthmask } from "../MakeMouthmask/MakeMouthmask";

export default () => {
  const goto = useGoto();
  const { user } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user.isMaker) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.isMaker ? (
    <FullSpinner tip={t("redirect.noHero")} />
  ) : (
    <MakeMouthmask />
  );
};
