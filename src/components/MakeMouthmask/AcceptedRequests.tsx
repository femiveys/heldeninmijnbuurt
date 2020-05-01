import { useEffect, useCallback, useState } from "react";
import {
  MailOutlined,
  WhatsAppOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Table, Space, Typography, Button, Row, Col, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRelationUser } from "../../types";
import Problem from "./Problem";

type TRecord = TRelationUser & { key: number };

const { Title } = Typography;
const { Column } = Table;

const addRemoveKey = (list: number[], record: TRecord) =>
  list.includes(record.key)
    ? list.filter((rowKey) => rowKey !== record.key)
    : [...list, record.key];

const iconStyle = {
  fontSize: 16,
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

      // We do an optimistic update on the user.
      updateUser({
        numDelivered: Number(user?.numDelivered) + needsMouthmaskAmount,
      });

      try {
        if (await apiCall("PUT", `superhero/markAsHandedOver/${relationId}`)) {
          await fetchAccepted();
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const expandedRowRender = (record: TRecord) => (
    <Row justify="space-between" align="bottom">
      <Col>
        <Space direction="vertical">
          <Space>
            <MailOutlined style={iconStyle} />
            <a href={`mailto:${record.user.email}`} target="_blank">
              {record.user.email}
            </a>
          </Space>
          {record.user.whatsapp && (
            <Space>
              <WhatsAppOutlined style={iconStyle} />
              {`+32${record.user.whatsapp}`}
            </Space>
          )}
        </Space>
      </Col>
      <Col>
        <Problem
          relationId={record.relation.id}
          afterSuccess={() => removeRow(record.relation.id)}
        />
      </Col>
    </Row>
  );

  const dataWithKeys =
    data && data.length > 0
      ? data.map((record) => ({ key: record.relation.id, ...record }))
      : [];

  return dataWithKeys.length > 0 ? (
    <div>
      <Title level={4}>{t("maker.accepted.title")}</Title>
      <Table<TRecord>
        size="small"
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
          dataIndex={["user", "name"]}
        />
        <Column<TRecord>
          key="needsMouthmaskAmount"
          title={t("needsMouthmaskAmount")}
          dataIndex={["user", "needsMouthmaskAmount"]}
          align="center"
        />
        <Column<TRecord>
          key="contact"
          dataIndex={["relation", "id"]}
          render={(_relationId, record) =>
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
                Number(record.user.needsMouthmaskAmount)
              )}
            ></Button>
          )}
        />
      </Table>
    </div>
  ) : null;
};

export default AcceptedRequests;
