import { useEffect } from "react";
import EnterMouthmaskAmount from "./EnterMouthmaskAmount";
import WaitingForAcceptance from "./WaitingForAcceptance";
import { useUser, useApi } from "../../hooks";
import { ERelationStatus, EUserStatus } from "../../types";
import WithSuperhero from "./WithSuperhero";
import NoSuperheroFound from "./NoSuperheroFound";
import Spinner from "../Spinner";

export const SearchMouthmask = () => {
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

  // A user that is not active, so who has cancelled or is done cannot see the widget
  if (user?.status !== EUserStatus.active) return null;

  return (
    <>
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount fetchRelationStatus={fetchRelationStatus} />
      ) : isFetchingRelationStatus ? (
        <Spinner tip="Aan het kijken of we een superheld gevonden hebben voor jou" />
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
