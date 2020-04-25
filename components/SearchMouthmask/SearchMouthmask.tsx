import { ToggleableWidget } from "../ToggleableWidget";
import { useUser } from "../../base/user";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { useApi } from "../../base/api/useApi";
import { TUser, TRelation } from "../../types";
import { useEffect } from "react";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    isLoading: isFetchingSuperHero,
    data: superHero,
    error,
    callApi: fetchSuperHero,
  } = useApi<{ user: TUser; relation: TRelation }>(
    "GET",
    "requestor/superHero"
  );

  useEffect(() => {
    fetchSuperHero();
  }, []);

  const Switch = () => {
    if (user.needsMouthmaskAmount === 0) {
      return <EnterMouthmaskAmount />;
    } else if (!!superHero) {
      return (
        <Spin spinning={isFetchingSuperHero}>
          <SuperHeroContactInfo {...superHero} />
        </Spin>
      );
    } else {
      return (
        <div>
          <p>
            We hebben jammergenoeg niemand in je buurt gevonden die maskers
            heeft. We blijven zoeken en zullen je een e-mail sturen zodra we
            niemand vinden.
          </p>
          <p>
            Laat op sociale media weten van deze applicatie. Misschien vinden we
            zo wel iemand.
          </p>
          <p>Knoppen en zo...</p>
        </div>
      );
    }
  };

  return (
    <ToggleableWidget
      title={t("requestor.collapseTitle")}
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      <Switch />
    </ToggleableWidget>
  );
};
