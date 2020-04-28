import { ToggleableWidget } from "../ToggleableWidget";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";
import { useEffect } from "react";
import { TRelationUser, ERelationStatus } from "../../types";
import { Spin } from "antd";
import { NoSuperHeroFound } from "./NoSuperHeroFound";
import { Done } from "./Done";
import { WaitingForAcceptance } from "./WaitingForAcceptance";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: superHero,
    error,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superHero");

  useEffect(() => {
    if (user?.needsMouthmaskAmount) fetchSuperHero();
  }, []);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  // A user that has cancelled cannot see the widget
  if (user?.cancelDate) return null;

  return (
    <ToggleableWidget
      title={t("requestor.collapseTitle")}
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount fetchSuperHero={fetchSuperHero} />
      ) : isFetchingSuperHero ? (
        <Spin tip={t("requestor.contact.loading")} />
      ) : !superHero ? (
        <NoSuperHeroFound />
      ) : superHero.relation.status === ERelationStatus.requested ? (
        <WaitingForAcceptance />
      ) : superHero.relation.requestorHandoverDate ? (
        <Done
          needsMouthmaskAmount={needsMouthmaskAmount}
          showStars={!superHero.relation.heroStars}
        ></Done>
      ) : (
        <SuperHeroContactInfo
          relationUser={superHero}
          needsMouthmaskAmount={needsMouthmaskAmount}
        />
      )}
    </ToggleableWidget>
  );
};
