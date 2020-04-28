import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, Space, Typography, Row, Col, Button, Modal } from "antd";
import {
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useApi, useUser } from "../../hooks";
import { notImplemented } from "../../helpers";
import { TRelationUser } from "../../types";

const { confirm } = Modal;
const { Paragraph } = Typography;

const iconStyle = {
  fontSize: 32,
};

type TProps = {
  relationUser: TRelationUser;
  needsMouthmaskAmount: number;
};

export const SuperHeroContactInfo = (props: TProps) => {
  const { t } = useTranslation();
  const { fetchUser } = useUser();
  const {
    isLoading: isMarkingAsHandedOver,
    callApi: markAsHandedOver,
  } = useApi("PUT", "requestor/markAsHandedOver", []);
  const { callApi: cancel } = useApi("PUT", "requestor/cancel");

  const { relationUser, needsMouthmaskAmount } = props;

  const count = {
    count: needsMouthmaskAmount,
  };

  const onCancel = useCallback(() => {
    confirm({
      title: t("requestor.contact.cancel.title"),
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          <Paragraph>{t("requestor.contact.cancel.consequences1")}</Paragraph>
          <Paragraph>
            {t("requestor.contact.cancel.consequences2", {
              name: relationUser.user.name,
              count: needsMouthmaskAmount,
            })}
          </Paragraph>
        </Typography>
      ),
      okText: t("yes"),
      okType: "danger",
      cancelText: t("no"),
      onOk: async () => {
        await cancel();
        fetchUser();
      },
    });
  }, []);

  return (
    <Row>
      <Col flex="1 1">
        <Card
          title={t("requestor.contact.title")}
          extra={
            <Button size="small" type="link" danger onClick={onCancel}>
              {t("cancel")}
            </Button>
          }
        >
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <Space>
              <UserOutlined style={iconStyle} />
              {relationUser.user.name}
            </Space>
            <Space>
              <MailOutlined style={iconStyle} />
              <a href={`mailto:${relationUser.user.email}`} target="_blank">
                {relationUser.user.email}
              </a>
            </Space>
            {relationUser.user.whatsapp && (
              <Space>
                <WhatsAppOutlined style={iconStyle} />
                {`+32${relationUser.user.whatsapp}`}
              </Space>
            )}
            {relationUser.relation.heroHandoverDate ? (
              <div>
                <Paragraph>
                  {t("requestor.contact.heroMarkedAsHandedOver", count)}
                </Paragraph>
                <Space>
                  <Button
                    type="primary"
                    onClick={markAsHandedOver}
                    loading={isMarkingAsHandedOver}
                  >
                    {t("yes")}
                  </Button>
                  <Button onClick={() => notImplemented()}>{t("no")}</Button>
                </Space>
              </div>
            ) : (
              <Button type="primary" block>
                {t("requestor.contact.received", count)}
              </Button>
            )}
          </Space>
        </Card>
      </Col>
      <Col flex="1 1" style={{ padding: 16 }}>
        <Paragraph>Some info on how to get in contact ...</Paragraph>
      </Col>
    </Row>
  );
};
