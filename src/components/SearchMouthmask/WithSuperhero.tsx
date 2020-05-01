import { useApi } from "../../hooks";
import { TRelationUser } from "../../types";
import Done from "./Done";
import SuperHeroContactInfo from "./SuperHeroContactInfo";
import { Spin } from "antd";
import NoSuperHeroFound from "./NoSuperHeroFound";
import { useEffect } from "react";

type TProps = {
  needsMouthmaskAmount: number;
};

const WithSuperhero = ({ needsMouthmaskAmount }: TProps) => {
  const {
    isLoading: isFetchingSuperHero,
    data: superhero,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superhero/full");

  useEffect(() => {
    fetchSuperHero();
  }, []);

  return isFetchingSuperHero ? (
    <Spin
      tip="We zijn de gegevens van je superheld aan het ophalen"
      style={{ width: "100%", padding: 16 }}
    />
  ) : !superhero ? (
    <NoSuperHeroFound />
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
  );
};

export default WithSuperhero;
