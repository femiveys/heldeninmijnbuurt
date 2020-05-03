import { useApi } from "../../hooks";
import { TRelationUser } from "../../types";
import Done from "./Done";
import SuperheroContactInfo from "./SuperheroContactInfo";
import { Spin } from "antd";
import NoSuperheroFound from "./NoSuperheroFound";
import { useEffect } from "react";
import Spinner from "../Spinner";

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
    <Spinner tip="We zijn de gegevens van je superheld aan het ophalen" />
  ) : !superhero ? (
    <NoSuperheroFound />
  ) : superhero.relation.requestorHandoverDate ? (
    <Done
      needsMouthmaskAmount={needsMouthmaskAmount}
      showAppreciation={!superhero.relation.thanksDate}
    ></Done>
  ) : (
    <SuperheroContactInfo
      superhero={superhero}
      fetchSuperHero={fetchSuperHero}
      needsMouthmaskAmount={needsMouthmaskAmount}
    />
  );
};

export default WithSuperhero;
