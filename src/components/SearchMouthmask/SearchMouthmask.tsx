import { ToggleableWidget } from "../ToggleableWidget";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";
import { useEffect } from "react";
import { TRelationUser } from "../../types";
import { Spin } from "antd";
import { NoSuperHeroFound } from "./NoSuperHeroFound";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: relationUser,
    error,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superHero");

  useEffect(() => {
    fetchSuperHero();
  }, []);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  return (
    <ToggleableWidget
      title={t("requestor.collapseTitle")}
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount />
      ) : isFetchingSuperHero ? (
        <Spin tip={t("requestor.contact.loading")} />
      ) : relationUser ? (
        <SuperHeroContactInfo
          relationUser={relationUser}
          needsMouthmaskAmount={needsMouthmaskAmount}
        />
      ) : (
        <NoSuperHeroFound />
      )}
    </ToggleableWidget>
  );
};
