import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApi } from "../../hooks";
import { TRelationUser } from "../../types";
import SuperheroContactInfo from "./SuperheroContactInfo";
import NoSuperheroFound from "./NoSuperheroFound";
import Spinner from "../Spinner";
import Done from "./Done";

type TProps = {
  needsMouthmaskAmount: number;
};

const WithSuperhero = ({ needsMouthmaskAmount }: TProps) => {
  const { t } = useTranslation();
  const {
    isLoading: isFetchingSuperHero,
    data: superhero,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superhero/full");

  useEffect(() => {
    fetchSuperHero();
  }, []);

  return isFetchingSuperHero ? (
    <Spinner tip={t("requestor.found.loading")} />
  ) : !superhero ? (
    <NoSuperheroFound />
  ) : superhero.relation.requestorHandoverDate ? (
    <Done
      needsMouthmaskAmount={needsMouthmaskAmount}
      showAppreciation={!superhero.relation.thanksDate}
    />
  ) : (
    <SuperheroContactInfo
      superhero={superhero}
      fetchSuperHero={fetchSuperHero}
      needsMouthmaskAmount={needsMouthmaskAmount}
    />
  );
};

export default WithSuperhero;
