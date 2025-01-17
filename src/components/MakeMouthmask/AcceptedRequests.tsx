import { useEffect, useCallback, useState } from "react";
import {
  MailOutlined,
  WhatsAppOutlined,
  CheckOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Table, Button, Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRelationUser } from "../../types";
import Problem from "./Problem";
import Whatsapp from "../Whatsapp";
import { formatLengthDistance, ellipsis, share, appName } from "../../helpers";

type TRecord = TRelationUser & { key: number };

const { Paragraph, Text } = Typography;
const { Column } = Table;

const addRemoveKey = (list: number[], record: TRecord) =>
  list.includes(record.key)
    ? list.filter((rowKey) => rowKey !== record.key)
    : [...list, record.key];

const padding = 16;

const iconStyle = {
  fontSize: 24,
  paddingRight: padding,
  verticalAlign: "middle",
};

const vPadding = {
  paddingTop: padding / 2,
  paddingBottom: padding / 2,
};

type TProps = {
  requests: TRelationUser[];
  fetchAccepted: () => Promise<void>;
};

const AcceptedRequests = ({ requests, fetchAccepted }: TProps) => {
  const { t } = useTranslation();
  const { updateUser, user } = useUser();
  const [data, setData] = useState(requests);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  // Update the state when the requests change
  useEffect(() => {
    setData(requests);
  }, [requests]);

  const onContactClick = (record: TRecord) => () => {
    setExpandedRowKeys(addRemoveKey(expandedRowKeys, record));
  };

  const removeRow = (relationId: number) =>
    setData(data.filter((row) => row.relation.id !== relationId));

  const markAsHandedOver = useCallback(
    (relationId: number, needsMouthmaskAmount: number) => async () => {
      // We do an optimistic update on the current table
      removeRow(relationId);

      const numDelivered = user.numDelivered + needsMouthmaskAmount;

      // We do an optimistic update on the user.
      updateUser({ numDelivered });

      share(
        t,
        t("maker.accepted.share.body", { count: numDelivered }),
        t("maker.accepted.share.message", { count: numDelivered, appName })
      );

      try {
        if (await apiCall("PUT", `superhero/markAsHandedOver/${relationId}`)) {
          await fetchAccepted();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );

  const expandedRowRender = (record: TRecord) => (
    <div style={{ paddingLeft: padding }}>
      {record.user.whatsapp && (
        <div style={vPadding}>
          <WhatsAppOutlined style={iconStyle} />
          <Whatsapp
            message={t("maker.accepted.whatsapp", {
              requestor: record.user.name,
              superhero: user.name,
            })}
            number={record.user.whatsapp}
          />
        </div>
      )}
      <div style={vPadding}>
        <MailOutlined style={iconStyle} />
        <a href={`mailto:${record.user.email}`} target="_blank">
          {ellipsis(record.user.email, 35)}
        </a>
      </div>
      <div
        style={{
          ...vPadding,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <HomeOutlined style={iconStyle} />
          Woont op {formatLengthDistance(record.relation.distance)}
        </div>
        <div>
          <Problem
            relationId={record.relation.id}
            afterSuccess={() => removeRow(record.relation.id)}
          />
        </div>
      </div>
    </div>
  );

  const dataWithKeys =
    data && data.length > 0
      ? data.map((record) => ({ key: record.relation.id, ...record }))
      : [];

  return dataWithKeys.length > 0 ? (
    <div>
      <Divider orientation="left">{t("maker.accepted.title")}</Divider>
      <Table<TRecord>
        size="small"
        showHeader={false}
        className="accepted-requests"
        dataSource={dataWithKeys}
        pagination={false}
        expandable={{
          expandedRowKeys,
          expandedRowRender,
          onExpand: (_, record) => onContactClick(record)(),
        }}
      >
        <Column<TRecord>
          key="name"
          title={t("name")}
          render={(_, record) => {
            const count = record.user.needsMouthmaskAmount;
            return (
              <div>
                <div
                  style={{
                    maxWidth: screen.width - 171,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {record.user.name}
                </div>
                <Text type="secondary">
                  {record.relation.requestorHandoverDate
                    ? t("maker.accepted.amountReceived", { count })
                    : t("maker.accepted.amountReceived", { count })}
                </Text>
              </div>
            );
          }}
        />
        <Column<TRecord>
          key="contact"
          dataIndex={["relation", "id"]}
          render={(_, record) =>
            record.relation.requestorHandoverDate ? (
              <>{t("maker.accepted.received")}</>
            ) : (
              <Button
                type="link"
                icon={<WhatsAppOutlined />}
                onClick={onContactClick(record)}
              >
                {t("maker.accepted.contact")}
              </Button>
            )
          }
        />
        <Column<TRecord>
          key="markAsHandedOver"
          dataIndex={["relation", "id"]}
          render={(relationId, record) => (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              onClick={markAsHandedOver(
                relationId,
                record.user.needsMouthmaskAmount
              )}
            ></Button>
          )}
        />
      </Table>
      <Typography style={{ margin: 16, textAlign: "left" }}>
        <Paragraph>{t("maker.accepted.par1")}</Paragraph>
        <Paragraph>{t("maker.accepted.par2")}</Paragraph>
        <Paragraph>{t("maker.accepted.par3")}</Paragraph>
      </Typography>
    </div>
  ) : null;
};

export default AcceptedRequests;
