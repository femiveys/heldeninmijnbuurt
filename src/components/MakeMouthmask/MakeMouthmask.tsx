import { useEffect, useState } from "react";
import { Space, Row, Col, Spin } from "antd";
import Statistics from "./Statistics";
import { RequestedRequests } from "./RequestedRequests";
import AcceptedRequests from "./AcceptedRequests";
import { useUser, useApi } from "../../hooks";
import { grid } from "../../helpers";
import EnterStock from "./EnterStock";
import { TRequestedRequest, TRelationUser } from "../../types";

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
    console.log("INIT");
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
            size="large"
            direction="vertical"
            style={{ width: "100%", textAlign: "center" }}
          >
            <Statistics fetchRequested={fetchRequested} />
            {showSpinner ? (
              <Spin
                size="large"
                tip="Je aanvragen aan het ophalen..."
                style={{ marginTop: 100 }}
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
