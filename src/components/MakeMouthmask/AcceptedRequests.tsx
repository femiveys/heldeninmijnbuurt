import {
  useEffect,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  MailOutlined,
  WhatsAppOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Table, Space, Typography, Button, Spin, Row, Col, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { keyBy, find, mapValues, NumericDictionary } from "lodash";
import { apiCall } from "../../axios";
import { useApi } from "../../hooks";
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

export const AcceptedRequests = forwardRef(
  ({ requestedRequestsRef }: any, ref) => {
    const { t } = useTranslation();
    const { isLoading, callApi, data } = useApi<TRelationUser[]>(
      "GET",
      "superHero/requests/accepted",
      []
    );
    const [isUpdatingRelation, setUpdatingRelation] = useState<
      NumericDictionary<boolean>
    >({});
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({ callApi }));

    useEffect(() => {
      callApi();
    }, []);

    useEffect(() => {
      const dataByRelationId = keyBy(data, "relation.id");
      const initialMap = mapValues(dataByRelationId, () => false);
      setUpdatingRelation(initialMap);
    }, [data]);

    const markByHeroAsHandedOverOrDecline = (
      action: "markAsHandedOver" | "decline"
    ) => (relationId: number) => async () => {
      setUpdatingRelation({ ...isUpdatingRelation, [relationId]: true });
      try {
        if (await apiCall("PUT", `superHero/${action}/${relationId}`)) {
          await callApi();
        }
      } catch (error) {
        console.error(error);
      }
      setUpdatingRelation({ ...isUpdatingRelation, [relationId]: false });
    };

    const onContactClick = (record: TRecord) => () => {
      setExpandedRowKeys(addRemoveKey(expandedRowKeys, record));
    };

    const setDelivered = useCallback(
      markByHeroAsHandedOverOrDecline("markAsHandedOver"),
      [isUpdatingRelation]
    );
    const decline = useCallback(markByHeroAsHandedOverOrDecline("decline"), [
      isUpdatingRelation,
    ]);

    const isInitialLoading =
      isLoading && !find(isUpdatingRelation, (value) => value === true);

    const dataWithKeys =
      data && data.length > 0
        ? data.map((record) => ({ key: record.relation.id, ...record }))
        : [];

    return isInitialLoading ? (
      <Spin />
    ) : dataWithKeys.length > 0 ? (
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
            key="accept"
            dataIndex={["relation", "id"]}
            render={(relationId) => (
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={setDelivered(relationId)}
                loading={isUpdatingRelation[relationId]}
              ></Button>
            )}
          />
        </Table>
      </div>
    ) : null;
  }
);
