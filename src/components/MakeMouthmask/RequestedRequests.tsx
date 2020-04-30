import {
  useEffect,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Table, Typography, Button, Spin } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues, NumericDictionary } from "lodash";
import { formatLengthDistance } from "../../helpers";
import { apiCall } from "../../axios";
import { useApi, useUser } from "../../hooks";
import { TRequestedRequest } from "../../types";

const { Title } = Typography;
const { Column } = Table;

type TProps = {
  acceptedRequestsRef: any;
};

export const RequestedRequests = forwardRef(
  ({ acceptedRequestsRef }: TProps, ref) => {
    const { t } = useTranslation();
    const { user, updateUser } = useUser();
    const [isUpdatingRelation, setIsUpdatingRow] = useState<
      NumericDictionary<boolean>
    >({});
    const { isLoading, callApi, data } = useApi<TRequestedRequest[]>(
      "GET",
      "superhero/requests/requested",
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
      relationId: number,
      needsMouthmaskAmount?: number
    ) => async () => {
      setIsUpdatingRow({ ...isUpdatingRelation, [relationId]: true });

      if (needsMouthmaskAmount && user) {
        updateUser({ maskStock: user.maskStock - needsMouthmaskAmount });
      }

      try {
        if (await apiCall("PUT", `superhero/${action}/${relationId}`)) {
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

    return isInitialLoading ? (
      <Spin />
    ) : data && data.length > 0 ? (
      <div>
        <Title level={4}>{t("maker.requested.title")}</Title>
        <Table size="small" dataSource={data} pagination={false}>
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
          <Column<TRequestedRequest>
            key="accept"
            title={t("maker.requested.ableToHelp")}
            dataIndex="relationId"
            colSpan={2}
            align="center"
            render={(relationId, record) => (
              <Button
                type="primary"
                size="small"
                icon={<DownloadOutlined />}
                onClick={accept(relationId, record.needsMouthmaskAmount)}
              >
                {t("yes")}
              </Button>
            )}
          />
          <Column
            key="decline"
            dataIndex="relationId"
            colSpan={0}
            align="center"
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
      </div>
    ) : null;
  }
);
