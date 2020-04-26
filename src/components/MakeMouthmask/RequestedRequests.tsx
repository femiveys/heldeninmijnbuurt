import { useEffect, useCallback, useState } from "react";
import { Table, Space, Typography, Button, Spin } from "antd";
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
    const dataByRelationId = keyBy(data, "relationId");
    const initialMap = mapValues(dataByRelationId, () => false);
    setIsUpdatingRow(initialMap);
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

  const isInitialLoading =
    isLoading && !find(isUpdatingRelation, (value) => value === true);

  return isInitialLoading ? (
    <Space>
      <Title level={4}>{t("maker.requested.loading")}</Title>
      <Spin />
    </Space>
  ) : data.length > 0 ? (
    <Space direction="vertical">
      <Title level={4}>{t("maker.requested.title")}</Title>
      <Table dataSource={data} pagination={false}>
        <Column
          title={t("maker.requested.requestDate")}
          dataIndex="requestDate"
          render={(requestDate) => t("ago", { date: requestDate })}
        />
        <Column
          title={t("needsMouthmaskAmount")}
          dataIndex="needsMouthmaskAmount"
          align="center"
        />
        <Column
          title={t("maker.requested.distance")}
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
              {t("maker.requested.accept")}
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
              {t("maker.requested.decline")}
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
  ) : (
    <Title level={4}>{t("maker.requested.empty")}</Title>
  );
};
