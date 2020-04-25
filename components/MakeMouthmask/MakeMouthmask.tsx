import { useUser } from "../../base/user";
import { HeroTitle } from "./HeroTitle";
import { ToggleableWidget } from "../ToggleableWidget";
import { useTranslation } from "react-i18next";
import { AvailableForm } from "./AvailableForm";
import { RequestedRequests } from "./RequestedRequests";
import { Space } from "antd";

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
      </Space>
    </ToggleableWidget>
  );
};
