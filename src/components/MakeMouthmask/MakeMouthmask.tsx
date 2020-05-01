import { useEffect, useState } from "react";
import { Space, Row, Col, Spin } from "antd";
import Statistics from "./Statistics";
import { RequestedRequests } from "./RequestedRequests";
import AcceptedRequests from "./AcceptedRequests";
import { useUser, useApi } from "../../hooks";
import { grid } from "../../helpers";
import EnterStock from "./EnterStock";
import { TRequestedRequest, TRelationUser } from "../../types";
import Stop from "./Stop";

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

  return (
    <Row>
      <Col {...grid}>
        {user?.maskStock === null ? (
          <EnterStock />
        ) : (
          <Space
            direction="vertical"
            style={{ width: "100%", textAlign: "center" }}
          >
            <Statistics fetchRequested={fetchRequested} />
            <Stop
              hasPending={
                (requested || []).length > 0 || (accepted || []).length > 0
              }
            />
            {showSpinner ? (
              <Spin
                size="large"
                tip="Je aanvragen aan het ophalen..."
                style={{ marginTop: 40 }}
              />
            ) : (
              <>
                <RequestedRequests
                  requests={requested || []}
                  fetchAccepted={fetchAccepted}
                  fetchRequested={fetchRequested}
                />
                <AcceptedRequests
                  requests={accepted || []}
                  fetchAccepted={fetchAccepted}
                />
              </>
            )}
          </Space>
        )}
      </Col>
    </Row>
  );
};
