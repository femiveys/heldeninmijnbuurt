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
import { store } from "../../store";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: superHero,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superHero");
  const {
    isLoading: isSettingNeedsMouthmask,
    callApi: setNeedsMouthmask,
  } = useApi("PUT", "me/setNeedsMouthmask");
  const {
    isLoading: isUnsettingNeedsMouthmask,
    callApi: unsetNeedsMouthmask,
  } = useApi("PUT", "me/unsetNeedsMouthmask");

  useEffect(() => {
    if (user?.needsMouthmaskAmount) fetchSuperHero();
  }, []);

  const onToggle = useCallback(() => {
    const toggleOn = async () => {
      await setNeedsMouthmask();
      store.dispatch("user/setUser", { ...user!, needsMouthmask: true });
    };
    const toggleOff = async () => {
      await unsetNeedsMouthmask();
      store.dispatch("user/setUser", { ...user!, needsMouthmask: false });
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
      isToggling={isSettingNeedsMouthmask || isUnsettingNeedsMouthmask}
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
