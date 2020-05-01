import { Spin } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import EnterMouthmaskAmount from "./EnterMouthmaskAmount";
import WaitingForAcceptance from "./WaitingForAcceptance";
import { useUser, useApi } from "../../hooks";
import { ERelationStatus } from "../../types";
import WithSuperhero from "./WithSuperhero";
import NoSuperheroFound from "./NoSuperheroFound";

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
          tip="Aan het kijken of we een superheld gevonden hebben voor jou"
          style={{ width: "100%", marginTop: 200 }}
        />
      ) : !relationStatus ? (
        <NoSuperheroFound />
      ) : relationStatus === ERelationStatus.requested ? (
        <WaitingForAcceptance />
      ) : (
        <WithSuperhero needsMouthmaskAmount={needsMouthmaskAmount} />
      )}
    </>
  );
};
