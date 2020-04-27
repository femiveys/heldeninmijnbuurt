import {
  useEffect,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Table, Space, Typography, Button, Spin } from "antd";
import {
  ExclamationCircleOutlined,
  CheckOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues, NumericDictionary } from "lodash";
import { apiCall } from "../../axios";
import { useApi } from "../../hooks";
import { TRelationUser } from "../../types";

const { Title } = Typography;
const { Column } = Table;

export const AcceptedRequests = forwardRef(
  ({ requestedRequestsRef }: any, ref) => {
    const { t } = useTranslation();
    const [isUpdatingRelation, setIsUpdatingRow] = useState<
      NumericDictionary<boolean>
    >({});
    const { isLoading, callApi, data } = useApi<TRelationUser[]>(
      "GET",
      "superHero/acceptedRequests",
      []
    );

    useImperativeHandle(ref, () => ({ callApi }));

    useEffect(() => {
      callApi();
    }, []);

    useEffect(() => {
      const dataByRelationId = keyBy(data, "relation.id");
      const initialMap = mapValues(dataByRelationId, () => false);
      setIsUpdatingRow(initialMap);
    }, [data]);

    const markByHeroAsHandedOverOrDecline = (
      action: "markByHeroAsHandedOver" | "decline"
    ) => (relationId: number) => async () => {
      setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: true });
      try {
        if (await apiCall("PUT", `superHero/${action}/${relationId}`)) {
          await callApi();
        }
      } catch (error) {
        console.error(error);
      }
      setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: false });
    };

    const setDelivered = useCallback(
      markByHeroAsHandedOverOrDecline("markByHeroAsHandedOver"),
      [isUpdatingRelation]
    );
    const decline = useCallback(markByHeroAsHandedOverOrDecline("decline"), [
      isUpdatingRelation,
    ]);

    const isInitialLoading =
      isLoading && !find(isUpdatingRelation, (value) => value === true);

    return isInitialLoading ? (
      <Space>
        <Title level={4}>{t("maker.accepted.loading")}</Title>
        <Spin />
      </Space>
    ) : data && data.length > 0 ? (
      <Space direction="vertical">
        <Title level={4}>{t("maker.accepted.title")}</Title>
        <Table size="small" dataSource={data} pagination={false}>
          <Column key="name" title={t("name")} dataIndex={["user", "name"]} />
          <Column
            key="needsMouthmaskAmount"
            title={t("needsMouthmaskAmount")}
            dataIndex={["user", "needsMouthmaskAmount"]}
            align="center"
          />
          <Column
            key="contact"
            dataIndex={["relation", "id"]}
            render={(relationId) => (
              <Button
                type="link"
                icon={<WhatsAppOutlined />}
                onClick={() => {
                  console.log("expand", relationId);
                }}
              >
                {t("maker.accepted.contact")}
              </Button>
            )}
          />
          <Column
            key="accept"
            dataIndex={["relation", "id"]}
            render={(relationId) => (
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={setDelivered(relationId)}
              >
                {t("maker.accepted.setDelivered")}
              </Button>
            )}
          />
          <Column
            key="problem"
            dataIndex={["relation", "id"]}
            render={(relationId) => (
              <Button
                danger
                type="link"
                icon={<ExclamationCircleOutlined />}
                onClick={decline(relationId)}
              >
                {t("maker.accepted.problem")}
              </Button>
            )}
          />
          <Column
            key="loading"
            dataIndex={["relation", "id"]}
            render={(relationId) => (
              <Spin spinning={isUpdatingRelation[relationId]} />
            )}
          />
        </Table>
      </Space>
    ) : (
      <Title level={4}>{t("maker.accepted.empty")}</Title>
    );
  }
);
