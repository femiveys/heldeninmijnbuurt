import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { HeroTitle } from "./HeroTitle";
import { ToggleableWidget } from "../ToggleableWidget";
import { AvailableForm } from "./AvailableForm";
import { RequestedRequests } from "./RequestedRequests";
import { useUser } from "../../hooks";
import { AcceptedRequests } from "./AcceptedRequests";

export const MakeMouthmask = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <ToggleableWidget
      title={t("maker.collapseTitle")}
      toggleField="isMaker"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      <Space direction="vertical" size="large">
        <HeroTitle numDelivered={user.numDelivered} />
        <AvailableForm />
        <RequestedRequests />
        <AcceptedRequests />
      </Space>
    </ToggleableWidget>
  );
};
