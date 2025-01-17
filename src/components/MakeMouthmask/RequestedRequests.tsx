import { useEffect, useCallback, useState } from "react";
import { Table, Typography, Button, Modal, Divider, Spin } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { NumericDictionary, mapValues, keyBy } from "lodash";
import { useTranslation } from "react-i18next";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { formatLengthDistance } from "../../helpers";
import { TRequestedRequest } from "../../types";

const { Paragraph } = Typography;
const { Column } = Table;

type TRecord = TRequestedRequest & { key: number };

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
    try {
      if (await apiCall("PUT", `superhero/${action}/${relationId}`)) {
        await fetchAccepted();
        await fetchRequested();
      }
    } catch (error) {
      console.error(error);
    }

    // We do an optimistic update on the current table
    setData(data.filter((row) => row.relationId !== relationId));

    // This will only be done if it's an accept because of passing needsMouthmaskAmount
    if (needsMouthmaskAmount && user) {
      updateUser({ maskStock: user.maskStock - needsMouthmaskAmount });
    }

    setIsUpdatingRelation({ ...isUpdatingRelation, [relationId]: false });
  };

  const accept = useCallback(acceptOrDecline("accept"), [
    data,
    user,
    isUpdatingRelation,
  ]);
  const decline = useCallback(acceptOrDecline("decline"), [
    data,
    user,
    isUpdatingRelation,
  ]);

  const dataWithKeys =
    data && data.length > 0
      ? data.map((record) => ({ key: record.relationId, ...record }))
      : [];

  return dataWithKeys.length > 0 ? (
    <div style={{ marginBottom: 32 }}>
      <Divider orientation="left">{t("maker.requested.title")}</Divider>
      <Table size="small" dataSource={dataWithKeys} pagination={false}>
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
        <Column<TRecord>
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
              onClick={() => {
                if (user.maskStock < record.needsMouthmaskAmount) {
                  Modal.warning({
                    title: t("maker.requested.notEnough.title"),
                    content: (
                      <Typography>
                        <Paragraph>
                          {t("maker.requested.notEnough.stock", {
                            count: user.maskStock,
                          })}{" "}
                          {t("maker.requested.notEnough.par1")}
                        </Paragraph>
                        <Paragraph>
                          {t("maker.requested.notEnough.par2")}
                        </Paragraph>
                      </Typography>
                    ),
                  });
                } else {
                  accept(relationId, record.needsMouthmaskAmount)();
                }
              }}
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
              onClick={() => {
                Modal.confirm({
                  title: t("maker.requested.decline.title"),
                  content: t("maker.requested.decline.content"),
                  okText: t("maker.requested.decline.yes"),
                  okButtonProps: { danger: true },
                  cancelText: t("no"),
                  onOk: decline(relationId),
                });
              }}
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
