import { useEffect, useCallback, useState } from "react";
import { Table, Space, Typography, Empty, Button, Spin } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues } from "lodash";
import { formatLengthDistance } from "../../helpers";
import { apiCall } from "../../axios";
import { useApi } from "../../hooks";
import { TRequestedRequest } from "../../types";

const { Title } = Typography;
const { Column } = Table;

export const RequestedRequests = () => {
  const { t } = useTranslation();
  const [isUpdatingRelation, setIsUpdatingRow] = useState({});
  const { isLoading, callApi, data } = useApi<TRequestedRequest[]>(
    "GET",
    "superHero/requestedRequests",
    []
  );

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    setIsUpdatingRow(mapValues(keyBy(data, "relationId"), () => false));
  }, [data]);

  const acceptOrDecline = (action: "accept" | "decline") => (
    relationId: number
  ) => async () => {
    setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: true });
    if (await apiCall("PUT", `superHero/${action}/${relationId}`)) {
      await callApi();
    }
    setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: false });
  };

  const accept = useCallback(acceptOrDecline("accept"), [isUpdatingRelation]);
  const decline = useCallback(acceptOrDecline("decline"), [isUpdatingRelation]);

  const showTableLoader =
    isLoading && !find(isUpdatingRelation, (value) => value === true);

  return (
    <Space direction="vertical">
      <Title level={4}>{t("maker.requested")}</Title>
      <Table
        dataSource={data}
        loading={showTableLoader}
        pagination={false}
        locale={{
          emptyText: <Empty description={t("maker.emptyRequested")} />,
        }}
      >
        <Column
          title={t("maker.requestDate")}
          dataIndex="requestDate"
          render={(requestDate) => t("ago", { date: requestDate })}
        />
        <Column
          title={t("needsMouthmaskAmount")}
          dataIndex="needsMouthmaskAmount"
          align="center"
        />
        <Column
          title={t("distance")}
          dataIndex="distance"
          align="right"
          render={(distance) => formatLengthDistance(distance)}
        />
        <Column
          key="accept"
          dataIndex="relationId"
          render={(relationId) => (
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={accept(relationId)}
            >
              {t("accept")}
            </Button>
          )}
        />
        <Column
          key="decline"
          dataIndex="relationId"
          render={(relationId) => (
            <Button
              danger
              type="link"
              icon={<MinusOutlined />}
              onClick={decline(relationId)}
            >
              {t("decline")}
            </Button>
          )}
        />
        <Column
          key="loading"
          dataIndex="relationId"
          render={(relationId) => (
            <Spin spinning={isUpdatingRelation[relationId]} />
          )}
        />
      </Table>
    </Space>
  );
};
