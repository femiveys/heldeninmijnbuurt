import { ToggleableWidget } from "../ToggleableWidget";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";
import { SuperHeroContactInfo } from "./SuperHeroContactInfo";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks";

export const SearchMouthmask = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <ToggleableWidget
      title={t("requestor.collapseTitle")}
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      {user?.needsMouthmaskAmount === 0 ? (
        <EnterMouthmaskAmount />
      ) : (
        <SuperHeroContactInfo />
      )}
    </ToggleableWidget>
  );
};
