import { ToggleableWidget } from "../ToggleableWidget";
import { useUser } from "../../base/user";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { useApi } from "../../base/api/useApi";
import { TUser, TRelation } from "../../types";
import { useEffect } from "react";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { Spin } from "antd";

export const SearchMouthmask = () => {
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

  return (
    <ToggleableWidget
      title="Ik zoek mondmaskers"
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      {user.needsMouthmaskAmount === 0 && <EnterMouthmaskAmount />}
      {user.needsMouthmaskAmount > 0 && !!superHero && (
        <Spin spinning={isFetchingSuperHero}>
          <SuperHeroContactInfo {...superHero} />
        </Spin>
      )}
    </ToggleableWidget>
  );
};
