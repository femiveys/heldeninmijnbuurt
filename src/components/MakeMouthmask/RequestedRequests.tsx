import {
  useEffect,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Table, Space, Typography, Button, Spin } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues, NumericDictionary } from "lodash";
import { formatLengthDistance } from "../../helpers";
import { apiCall } from "../../axios";
import { useApi } from "../../hooks";
import { TRequestedRequest } from "../../types";

const { Title } = Typography;
const { Column } = Table;

type TProps = {
  acceptedRequestsRef: any;
};

export const RequestedRequests = forwardRef(
  ({ acceptedRequestsRef }: TProps, ref) => {
    const { t } = useTranslation();
    const [isUpdatingRelation, setIsUpdatingRow] = useState<
      NumericDictionary<boolean>
    >({});
    const { isLoading, callApi, data } = useApi<TRequestedRequest[]>(
      "GET",
      "superHero/requestedRequests",
      []
    );

    useImperativeHandle(ref, () => ({ callApi }));

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
      try {
        if (await apiCall("PUT", `superHero/${action}/${relationId}`)) {
          await acceptedRequestsRef.current?.callApi();
          await callApi();
        }
      } catch (error) {
        console.error(error);
      }
      setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: false });
    };

    const accept = useCallback(acceptOrDecline("accept"), [isUpdatingRelation]);
    const decline = useCallback(acceptOrDecline("decline"), [
      isUpdatingRelation,
    ]);

    const isInitialLoading =
      isLoading && !find(isUpdatingRelation, (value) => value === true);

    console.log(isUpdatingRelation);

    return isInitialLoading ? (
      <Space>
        <Title level={4}>{t("maker.requested.loading")}</Title>
        <Spin />
      </Space>
    ) : data && data.length > 0 ? (
      <Space direction="vertical">
        <Title level={4}>{t("maker.requested.title")}</Title>
        <Table size="small" dataSource={data} pagination={false}>
          <Column
            key="requestDate"
            title={t("maker.requested.requestDate")}
            dataIndex="requestDate"
            render={(requestDate) => t("ago", { date: requestDate })}
          />
          <Column
            key="needsMouthmaskAmount"
            title={t("needsMouthmaskAmount")}
            dataIndex="needsMouthmaskAmount"
            align="center"
          />
          <Column
            key="distance"
            title={t("maker.requested.distance")}
            dataIndex="distance"
            align="right"
            render={(distance) => formatLengthDistance(distance)}
          />
          <Column
            key="accept"
            title={t("maker.requested.ableToHelp")}
            dataIndex="relationId"
            colSpan={2}
            render={(relationId) => (
              <Button
                type="primary"
                size="small"
                icon={<DownloadOutlined />}
                onClick={accept(relationId)}
              >
                {t("yes")}
              </Button>
            )}
          />
          <Column
            key="decline"
            dataIndex="relationId"
            colSpan={0}
            render={(relationId) => (
              <Button
                danger
                type="primary"
                size="small"
                icon={<CloseOutlined />}
                onClick={decline(relationId)}
              >
                {t("no")}
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
  }
);
