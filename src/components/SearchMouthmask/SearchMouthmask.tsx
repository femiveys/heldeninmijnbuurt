import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { ToggleableWidget } from "../ToggleableWidget";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { useUser, useApi } from "../../hooks";
import { TRelationUser, ERelationStatus } from "../../types";
import { NoSuperHeroFound } from "./NoSuperHeroFound";
import { Done } from "./Done";
import { WaitingForAcceptance } from "./WaitingForAcceptance";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: superHero,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superHero");
  const { isLoading, callApi } = useApi("PUT", "me/action");

  useEffect(() => {
    if (user!.needsMouthmaskAmount) fetchSuperHero();
  }, []);

  const onToggle = useCallback(() => {
    const toggleOn = async () => {
      await callApi({ name: "setNeedsMouthmask" });
      updateUser({ needsMouthmask: true });
    };
    const toggleOff = async () => {
      await callApi({ name: "unsetNeedsMouthmask" });
      updateUser({ needsMouthmask: false });
    };

    if (user?.needsMouthmask) {
      toggleOff();
    } else {
      toggleOn();
    }
  }, [user]);

  const needsMouthmaskAmount = Number(user?.needsMouthmaskAmount);

  // A user that has cancelled cannot see the widget
  if (user?.cancelDate) return null;

  return (
    <ToggleableWidget
      title={t("requestor.collapseTitle")}
      isOpen={!!user?.needsMouthmask}
      onToggle={user?.needsMouthmaskAmount === 0 ? onToggle : null}
      isToggling={isLoading}
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
          superHero={superHero}
          fetchSuperHero={fetchSuperHero}
          needsMouthmaskAmount={needsMouthmaskAmount}
        />
      )}
    </ToggleableWidget>
  );
};
