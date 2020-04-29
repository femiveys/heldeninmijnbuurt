import { useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { useTranslation } from "react-i18next";

const WaitingForAcceptance = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div>
      <p>
        We hebben iemand gevonden die maskers heeft. We hebben een mail gestuurd
        en nu wachten we tot die je aanvraag aanvaardt.
      </p>
      <p>
        Enkel het aantal maskers en de afstand is doorgegeven, dus geen
        persoonlijke informatie.
      </p>
      <p>
        Zodra je aanvraag aanvaard is, krijg je een mail en zal je de contact
        informatie vinden, zodat jullie het onderling kunnen regelen.
      </p>
      <CancelButton
        name={t("thePerson")}
        needsMouthmaskAmount={Number(user?.needsMouthmaskAmount)}
      />
    </div>
  );
};

export default WaitingForAcceptance;
