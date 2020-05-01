import { Spin } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import EnterMouthmaskAmount from "./EnterMouthmaskAmount";
import SuperHeroContactInfo from "./SuperHeroContactInfo";
import WaitingForAcceptance from "./WaitingForAcceptance";
import NoSuperHeroFound from "./NoSuperHeroFound";
import { useUser, useApi } from "../../hooks";
import Done from "./Done";
import { TRelationUser, ERelationStatus } from "../../types";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: superhero,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superhero");
  // const { isLoading, callApi } = useApi("PUT", "me/action");

  useEffect(() => {
    if (user!.needsMouthmaskAmount) fetchSuperHero();
  }, []);

  // const onToggle = useCallback(() => {
  //   const toggleOn = async () => {
  //     await callApi({ name: "setNeedsMouthmask" });
  //     updateUser({ needsMouthmask: true });
  //   };
  //   const toggleOff = async () => {
  //     await callApi({ name: "unsetNeedsMouthmask" });
  //     updateUser({ needsMouthmask: false });
  //   };
  //
  //   if (user?.needsMouthmask) {
  //     toggleOff();
  //   } else {
  //     toggleOn();
  //   }
  // }, [user]);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  // A user that has cancelled cannot see the widget
  if (user?.cancelDate) return null;

  return (
    <>
      {needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount fetchSuperHero={fetchSuperHero} />
      ) : true && isFetchingSuperHero ? (
        <Spin
          tip={t("requestor.contact.loading")}
          style={{ width: "100%", padding: 16 }}
        />
      ) : !superhero ? (
        <NoSuperHeroFound />
      ) : superhero.relation.status === ERelationStatus.requested ? (
        <WaitingForAcceptance />
      ) : superhero.relation.requestorHandoverDate ? (
        <Done
          needsMouthmaskAmount={needsMouthmaskAmount}
          showStars={!superhero.relation.heroStars}
        ></Done>
      ) : (
        <SuperHeroContactInfo
          superhero={superhero}
          fetchSuperHero={fetchSuperHero}
          needsMouthmaskAmount={needsMouthmaskAmount}
        />
      )}
    </>
  );
};
