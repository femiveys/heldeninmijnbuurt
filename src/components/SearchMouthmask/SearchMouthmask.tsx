import { Spin } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import EnterMouthmaskAmount from "./EnterMouthmaskAmount";
import WaitingForAcceptance from "./WaitingForAcceptance";
import NoSuperHeroFound from "./NoSuperHeroFound";
import { useUser, useApi } from "../../hooks";
import { ERelationStatus } from "../../types";
import WithSuperHero from "./WithSuperhero";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingRelationStatus,
    data: relationStatus,
    callApi: fetchRelationStatus,
  } = useApi<ERelationStatus>("GET", "requestor/superhero/status");

  useEffect(() => {
    if (user!.needsMouthmaskAmount) fetchRelationStatus();
  }, []);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  // A user that has cancelled cannot see the widget
  if (user?.cancelDate) return null;

  return (
    <>
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount fetchRelationStatus={fetchRelationStatus} />
      ) : isFetchingRelationStatus ? (
        <Spin
          tip="Aan het kijk of we een superheld gevonden hebben voor jou"
          style={{ width: "100%", padding: 16 }}
        />
      ) : !relationStatus ? (
        <NoSuperHeroFound />
      ) : relationStatus === ERelationStatus.requested ? (
        <WaitingForAcceptance />
      ) : (
        <WithSuperHero needsMouthmaskAmount={needsMouthmaskAmount} />
      )}
    </>
  );
};
