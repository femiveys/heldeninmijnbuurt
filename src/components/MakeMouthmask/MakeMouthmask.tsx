import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { HeroTitle } from "./HeroTitle";
import { ToggleableWidget } from "../ToggleableWidget";
import { AvailableForm } from "./AvailableForm";
import { RequestedRequests } from "./RequestedRequests";
import { useUser, useApi } from "../../hooks";
import { AcceptedRequests } from "./AcceptedRequests";
import { useRef, useCallback } from "react";
import { store } from "../../store";

export const MakeMouthmask = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const acceptedRequestsRef = useRef<typeof AcceptedRequests>(null);
  const requestedRequestsRef = useRef<typeof RequestedRequests>(null);
  const { isLoading, callApi } = useApi("PUT", "me/action");

  const onToggle = useCallback(() => {
    const toggleOn = async () => {
      await callApi({ name: "setIsMaker" });
      store.dispatch("user/setUser", { ...user!, isMaker: true });
    };
    const toggleOff = async () => {
      await callApi({ name: "unsetIsMaker" });
      store.dispatch("user/setUser", { ...user!, isMaker: false });
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
