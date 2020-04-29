import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, Space, Typography, Row, Col, Button } from "antd";
import {
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useApi } from "../../hooks";
import CancelButton from "./CancelButton";
import { TRelationUser } from "../../types";
import { notImplemented } from "../../helpers";

const { Paragraph } = Typography;

const iconStyle = {
  fontSize: 32,
};

type TProps = {
  superhero: TRelationUser;
  fetchSuperHero: () => Promise<void>;
  needsMouthmaskAmount: number;
};

const SuperHeroContactInfo = (props: TProps) => {
  const { t } = useTranslation();
  const { isLoading: isMarkingAsHandedOver, callApi } = useApi(
    "PUT",
    "requestor/action"
  );

  const { superhero, needsMouthmaskAmount, fetchSuperHero } = props;

  const markAsHandedOver = useCallback(async () => {
    await callApi({ name: "markAsHandedOver" });
    await fetchSuperHero();
  }, []);

  const count = {
    count: needsMouthmaskAmount,
  };

  return (
    <Row>
      <Col flex="1 1">
        <Card
          title={t("requestor.contact.title")}
          extra={
            <CancelButton
              name={superhero.user.name}
              needsMouthmaskAmount={needsMouthmaskAmount}
            />
          }
        >
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <Space>
              <UserOutlined style={iconStyle} />
              {superhero.user.name}
            </Space>
            <Space>
              <MailOutlined style={iconStyle} />
              <a href={`mailto:${superhero.user.email}`} target="_blank">
                {superhero.user.email}
              </a>
            </Space>
            {superhero.user.whatsapp && (
              <Space>
                <WhatsAppOutlined style={iconStyle} />
                {`+32${superhero.user.whatsapp}`}
              </Space>
            )}
            {superhero.relation.heroHandoverDate ? (
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
              <Button
                block
                type="primary"
                onClick={markAsHandedOver}
                loading={isMarkingAsHandedOver}
              >
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

export default SuperHeroContactInfo;
