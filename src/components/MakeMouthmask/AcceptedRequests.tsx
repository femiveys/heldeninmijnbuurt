import { useEffect, useCallback, useState } from "react";
import { Table, Space, Typography, Empty, Button, Spin } from "antd";
import {
  MinusOutlined,
  CheckOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues } from "lodash";
import { apiCall } from "../../axios";
import { useApi } from "../../hooks";
import { TRelationUser } from "../../types";

const { Title } = Typography;
const { Column } = Table;

export const AcceptedRequests = () => {
  const { t } = useTranslation();
  const [isUpdatingRelation, setIsUpdatingRow] = useState({});
  const { isLoading, callApi, data } = useApi<TRelationUser[]>(
    "GET",
    "superHero/acceptedRequests",
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

  const setDeliverOrDecline = (action: "setDelivered" | "decline") => (
    relationId: number
  ) => async () => {
    setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: true });
    if (await apiCall("PUT", `superHero/${action}/${relationId}`)) {
      await callApi();
    }
    setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: false });
  };

  const setDelivered = useCallback(setDeliverOrDecline("setDelivered"), [
    isUpdatingRelation,
  ]);
  const decline = useCallback(setDeliverOrDecline("decline"), [
    isUpdatingRelation,
  ]);

  const isInitialLoading =
    isLoading && !find(isUpdatingRelation, (value) => value === true);

  return isInitialLoading ? (
    <Space>
      <Title level={4}>{t("maker.accepted.loading")}</Title>
      <Spin />
    </Space>
  ) : data.length > 0 ? (
    <Space direction="vertical">
      <Title level={4}>{t("maker.accepted.title")}</Title>
      <Table dataSource={data} pagination={false}>
        <Column title={t("name")} dataIndex={["user", "name"]} />
        <Column
          title={t("needsMouthmaskAmount")}
          dataIndex={["user", "needsMouthmaskAmount"]}
          align="center"
        />
        <Column
          dataIndex={["relation", "id"]}
          render={(relationId) => (
            <Button
              type="link"
              icon={<WhatsAppOutlined />}
              onClick={() => console.log("expand", relationId)}
            >
              {t("maker.accepted.contact")}
            </Button>
          )}
        />
        <Column
          key="accept"
          dataIndex="relation.id"
          render={(relationId) => (
            <Button
              type="link"
              icon={<CheckOutlined />}
              onClick={setDelivered(relationId)}
            >
              {t("maker.accepted.setDelivered")}
            </Button>
          )}
        />
        <Column
          key="problem"
          dataIndex="relationId"
          render={(relationId) => (
            <Button
              danger
              type="link"
              icon={<MinusOutlined />}
              onClick={decline(relationId)}
            >
              {t("maker.accepted.problem")}
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
    <Title level={4}>{t("maker.accepted.empty")}</Title>
  );
};
