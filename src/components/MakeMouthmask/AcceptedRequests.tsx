import { useEffect, useCallback, useState } from "react";
import {
  MailOutlined,
  WhatsAppOutlined,
  CheckOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Table, Space, Button, Row, Col, Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRelationUser } from "../../types";
import Problem from "./Problem";
import Whatsapp from "../Whatsapp";
import { formatLengthDistance, ellipsis } from "../../helpers";

type TRecord = TRelationUser & { key: number };

const { Paragraph } = Typography;
const { Column } = Table;

const addRemoveKey = (list: number[], record: TRecord) =>
  list.includes(record.key)
    ? list.filter((rowKey) => rowKey !== record.key)
    : [...list, record.key];

const iconStyle = {
  fontSize: 20,
  marginRight: 16,
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
    [user]
  );

  const expandedRowRender = (record: TRecord) => (
    <div style={{ paddingLeft: 16 }}>
      {record.user.whatsapp && (
        <div>
          <WhatsAppOutlined style={iconStyle} />
          <Whatsapp
            message={t("maker.accepted.whatsapp", {
              requestor: record.user.name,
              superhero: user?.name,
            })}
            number={record.user.whatsapp}
          />
        </div>
      )}
      <div style={{ marginTop: 4, marginBottom: 4 }}>
        <MailOutlined style={iconStyle} />
        <a href={`mailto:${record.user.email}`} target="_blank">
          {ellipsis(record.user.email, 35)}
        </a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                record.user.needsMouthmaskAmount
              )}
            ></Button>
          )}
        />
      </Table>
      <Typography style={{ margin: 16, textAlign: "left" }}>
        <Paragraph>
          Nu hebben jullie mekaars contactgegevens. Kom in contact met elkaar en
          spreek af hoe je de overhandiging kan laten gebeuren.
        </Paragraph>
        <Paragraph>
          Indien de maskers opgehaald worden, zorg ervoor dat alles veilig en
          met de nodige afstand gebeurt.
        </Paragraph>
        <Paragraph>
          Indien jij de maskers gaat afleveren, probeer indien mogelijk met de
          fiets te gaan. Hou afstand en was je handen voor en na de
          overhandiging.
        </Paragraph>
      </Typography>
    </div>
  ) : null;
};

export default AcceptedRequests;
