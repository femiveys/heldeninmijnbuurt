import { useEffect, useCallback, useState } from "react";
import {
  MailOutlined,
  WhatsAppOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Table, Space, Typography, Button, Spin, Row, Col, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { mapValues, NumericDictionary, keyBy } from "lodash";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRelationUser } from "../../types";

type TRecord = TRelationUser & { key: number };

const { Title } = Typography;
const { Column } = Table;
const { confirm } = Modal;

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
  const [isUpdatingRelation, setUpdatingRelation] = useState<
    NumericDictionary<boolean>
  >({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  // Initialize the isUpdatingRelation map
  useEffect(() => {
    const dataByRelationId = keyBy(data, "relation.id");
    const initialMap = mapValues(dataByRelationId, () => false);
    setUpdatingRelation(initialMap);
  }, [data]);

  // Update the state when the requests change
  useEffect(() => {
    setData(requests);
  }, [requests]);

  const markAsHandedOverOrDecline = (
    action: "markAsHandedOver" | "decline"
  ) => (relationId: number, needsMouthmaskAmount?: number) => async () => {
    setUpdatingRelation({ ...isUpdatingRelation, [relationId]: true });
    try {
      if (await apiCall("PUT", `superhero/${action}/${relationId}`)) {
        if (needsMouthmaskAmount && user) {
          updateUser({
            numDelivered: user.numDelivered + needsMouthmaskAmount,
          });
        }
        await fetchAccepted();
      }
    } catch (error) {
      console.error(error);
    }
    setUpdatingRelation({ ...isUpdatingRelation, [relationId]: false });
  };

  const onContactClick = (record: TRecord) => () => {
    setExpandedRowKeys(addRemoveKey(expandedRowKeys, record));
  };

  const markAsHandedOver = useCallback(
    markAsHandedOverOrDecline("markAsHandedOver"),
    [isUpdatingRelation]
  );
  const decline = useCallback(markAsHandedOverOrDecline("decline"), [
    isUpdatingRelation,
  ]);

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
          onExpand: (_, record) => onContactClick(record)(),
          expandedRowRender: (record) => (
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
                <Button
                  size="small"
                  danger
                  type="link"
                  onClick={() => {
                    confirm({
                      title: "TODO",
                    });
                  }}
                >
                  {t("maker.accepted.problem")}
                </Button>
              </Col>
            </Row>
          ),
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
                record.user.needsMouthmaskAmount
              )}
              loading={isUpdatingRelation[relationId]}
            ></Button>
          )}
        />
      </Table>
    </div>
  ) : null;
};

export default AcceptedRequests;
