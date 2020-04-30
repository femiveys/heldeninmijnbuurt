import { useEffect, useCallback, useState } from "react";
import { Table, Typography, Button, Spin } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { keyBy, mapValues, NumericDictionary } from "lodash";
import { formatLengthDistance } from "../../helpers";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRequestedRequest } from "../../types";

const { Title } = Typography;
const { Column } = Table;

type TProps = {
  requests: TRequestedRequest[];
  fetchAccepted: () => Promise<void>;
  fetchRequested: () => Promise<void>;
};

export const RequestedRequests = ({
  requests,
  fetchAccepted,
  fetchRequested,
}: TProps) => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const [data, setData] = useState(requests);
  const [isUpdatingRelation, setIsUpdatingRelation] = useState<
    NumericDictionary<boolean>
  >({});

  // Initialize the isUpdatingRelation map
  useEffect(() => {
    const dataByRelationId = keyBy(data, "relationId");
    const initialMap = mapValues(dataByRelationId, () => false);
    setIsUpdatingRelation(initialMap);
  }, [data]);

  // Update the state when the requests change
  useEffect(() => {
    setData(requests);
  }, [requests]);

  const acceptOrDecline = (action: "accept" | "decline") => (
    relationId: number,
    needsMouthmaskAmount?: number
  ) => async () => {
    setIsUpdatingRelation({ ...isUpdatingRelation, [relationId]: true });

    if (needsMouthmaskAmount && user) {
      updateUser({ maskStock: user.maskStock - needsMouthmaskAmount });
    }

    try {
      if (await apiCall("PUT", `superhero/${action}/${relationId}`)) {
        await fetchAccepted();
        await fetchRequested();
      }
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingRelation({ ...isUpdatingRelation, [relationId]: false });
  };

  const accept = useCallback(acceptOrDecline("accept"), [isUpdatingRelation]);
  const decline = useCallback(acceptOrDecline("decline"), [isUpdatingRelation]);

  return data && data.length > 0 ? (
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
};
