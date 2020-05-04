import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import Statistics from "./Statistics";
import { RequestedRequests } from "./RequestedRequests";
import AcceptedRequests from "./AcceptedRequests";
import { useUser, useApi } from "../../hooks";
import { grid } from "../../helpers";
import EnterStock from "./EnterStock";
import { TRequestedRequest, TRelationUser } from "../../types";
import Stop from "./Stop";
import Message from "./Message";
import Undisguise from "./Undisguise";

export const MakeMouthmask = () => {
  const { user } = useUser();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {
    isLoading: isLoadingRequested,
    callApi: fetchRequested,
    data: requested,
  } = useApi<TRequestedRequest[]>("GET", "superhero/requests/requested", []);
  const {
    isLoading: isLoadingAccepted,
    callApi: fetchAccepted,
    data: accepted,
  } = useApi<TRelationUser[]>("GET", "superhero/requests/accepted", []);

  useEffect(() => {
    const init = async () => {
      await fetchRequested();
      await fetchAccepted();
      setIsInitialLoading(false);
    };
    init();
  }, []);

  const showSpinner =
    isInitialLoading && (isLoadingRequested || isLoadingAccepted);

  const requestedRequests = requested || [];
  const acceptedRequests = accepted || [];

  return (
    <Row>
      <Col {...grid}>
        {user?.maskStock === null ? (
          <EnterStock fetchRequested={fetchRequested} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: 16 }}>
            <Statistics fetchRequested={fetchRequested} />
            <Message closable={Number(user?.numDelivered) > 10} />
            <Stop
              hasPending={
                requestedRequests.length > 0 || acceptedRequests.length > 0
              }
            />
            <Undisguise />
            {showSpinner ? (
              <Spin
                size="large"
                style={{ paddingTop: 40 }}
                tip="Je aanvragen aan het ophalen..."
              />
            ) : (
              <>
                {isLoadingRequested && requestedRequests.length === 0 ? (
                  <Spin size="small" />
                ) : (
                  <RequestedRequests
                    requests={requestedRequests}
                    fetchAccepted={fetchAccepted}
                    fetchRequested={fetchRequested}
                  />
                )}
                {isLoadingAccepted && acceptedRequests.length === 0 ? (
                  <Spin size="small" />
                ) : (
                  <AcceptedRequests
                    requests={acceptedRequests}
                    fetchAccepted={fetchAccepted}
                  />
                )}
              </>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};
