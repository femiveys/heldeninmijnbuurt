import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { HeroTitle } from "./HeroTitle";
import { ToggleableWidget } from "../ToggleableWidget";
import { AvailableForm } from "./AvailableForm";
import { RequestedRequests } from "./RequestedRequests";
import { useUser, useApi } from "../../hooks";
import { AcceptedRequests } from "./AcceptedRequests";
import { useRef, useCallback } from "react";

export const MakeMouthmask = () => {
  const { user, updateUser } = useUser();
  const { t } = useTranslation();
  const acceptedRequestsRef = useRef<typeof AcceptedRequests>(null);
  const requestedRequestsRef = useRef<typeof RequestedRequests>(null);
  const { isLoading, callApi } = useApi("PUT", "me/action");

  const onToggle = useCallback(() => {
    const toggleOn = async () => {
      await callApi({ name: "setIsMaker" });
      updateUser({ isMaker: true });
    };
    const toggleOff = async () => {
      await callApi({ name: "unsetIsMaker" });
      updateUser({ isMaker: false });
    };

    if (user?.isMaker) {
      toggleOff();
    } else {
      toggleOn();
    }
  }, [user]);

  return (
    <ToggleableWidget
      title={t("maker.collapseTitle")}
      isOpen={!!user?.isMaker}
      onToggle={onToggle}
      isToggling={isLoading}
    >
      <Space direction="vertical" size="large">
        <HeroTitle numDelivered={user ? user.numDelivered : 0} />
        <AvailableForm />
        <RequestedRequests
          ref={requestedRequestsRef}
          acceptedRequestsRef={acceptedRequestsRef}
        />
        <AcceptedRequests
          ref={acceptedRequestsRef}
          requestedRequestsRef={requestedRequestsRef}
        />
      </Space>
    </ToggleableWidget>
  );
};
