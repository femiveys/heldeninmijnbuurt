import { useEffect } from "react";
import EnterMouthmaskAmount from "./EnterMouthmaskAmount";
import WaitingForAcceptance from "./WaitingForAcceptance";
import { useUser, useApi } from "../../hooks";
import { ERelationStatus, EUserStatus, TDistanceAndStatus } from "../../types";
import WithSuperhero from "./WithSuperhero";
import NoSuperheroFound from "./NoSuperheroFound";
import Spinner from "../Spinner";

export const SearchMouthmask = () => {
  const { user } = useUser();
  const {
    isLoading: isFetchingRelationStatus,
    data: distanceAndStatus,
    callApi: fetchRelationStatus,
  } = useApi<TDistanceAndStatus>("GET", "requestor/superhero/status");

  useEffect(() => {
    if (user!.needsMouthmaskAmount) fetchRelationStatus();
  }, []);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  // A user that is not active, so who has cancelled or is done cannot see the widget
  if (user?.status === EUserStatus.cancelled) return null;

  return (
    <>
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount fetchRelationStatus={fetchRelationStatus} />
      ) : isFetchingRelationStatus ? (
        <Spinner tip="Aan het kijken of we in je buurt een superheld gevonden hebben" />
      ) : !distanceAndStatus ? (
        <NoSuperheroFound />
      ) : distanceAndStatus.status === ERelationStatus.requested ? (
        <WaitingForAcceptance distance={distanceAndStatus.distance} />
      ) : (
        <WithSuperhero needsMouthmaskAmount={needsMouthmaskAmount} />
      )}
    </>
  );
};
