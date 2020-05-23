import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import { SearchMouthmask } from "../SearchMouthmask/SearchMouthmask";

export default () => {
  const goto = useGoto();
  const { user } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user.needsMouthmask) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.needsMouthmask ? (
    <FullSpinner tip={t("redirect.noSearching")} />
  ) : (
    <SearchMouthmask />
  );
};
