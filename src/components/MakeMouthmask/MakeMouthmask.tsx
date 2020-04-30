import { useRef } from "react";
import { Space, Row, Col } from "antd";
import HeroTitle from "./HeroTitle";
import MaskStock from "./MaskStock";
import { RequestedRequests } from "./RequestedRequests";
import AcceptedRequests from "./AcceptedRequests";
import { useUser } from "../../hooks";
import { grid } from "../../helpers";
import EnterStock from "./EnterStock";

export const MakeMouthmask = () => {
  const { user } = useUser();
  const acceptedRequestsRef = useRef<typeof AcceptedRequests>(null);
  const requestedRequestsRef = useRef<typeof RequestedRequests>(null);
  // const { isLoading, callApi } = useApi("PUT", "me/action");

  // const onToggle = useCallback(() => {
  //   const toggleOn = async () => {
  //     await callApi({ name: "setIsMaker" });
  //     updateUser({ isMaker: true });
  //   };
  //   const toggleOff = async () => {
  //     await callApi({ name: "unsetIsMaker" });
  //     updateUser({ isMaker: false });
  //   };
  //
  //   if (user?.isMaker) {
  //     toggleOff();
  //   } else {
  //     toggleOn();
  //   }
  // }, [user]);

  console.log(user);

  return (
    <Row>
      <Col {...grid}>
        {user?.maskStock === null ? (
          <EnterStock />
        ) : (
          <Space
            size="large"
            direction="vertical"
            style={{ width: "100%", textAlign: "center" }}
          >
            {user?.numDelivered ? (
              <HeroTitle numDelivered={user.numDelivered} />
            ) : null}
            <MaskStock />
            <RequestedRequests
              ref={requestedRequestsRef}
              acceptedRequestsRef={acceptedRequestsRef}
            />
            <AcceptedRequests
              ref={acceptedRequestsRef}
              requestedRequestsRef={requestedRequestsRef}
            />
          </Space>
        )}
      </Col>
    </Row>
  );
};
