import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, Space, Typography, Row, Col, Button, Alert } from "antd";
import {
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useApi, useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { TRelationUser, EUserStatus } from "../../types";
import { notImplemented, grid } from "../../helpers";
import Whatsapp from "../Whatsapp";
import SearchSteps from "./SearchSteps";
import Disguise from "./Disguise";

const { Paragraph, Text } = Typography;

const iconStyle = {
  fontSize: 32,
};

type TProps = {
  superhero: TRelationUser;
  fetchSuperHero: () => Promise<void>;
  needsMouthmaskAmount: number;
};

const SuperheroContactInfo = (props: TProps) => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { isLoading: isMarkingAsHandedOver, callApi } = useApi(
    "PUT",
    "requestor/action"
  );

  const { superhero, needsMouthmaskAmount, fetchSuperHero } = props;

  const markAsHandedOver = useCallback(async () => {
    await callApi({ name: "markAsHandedOver" });
    await fetchSuperHero();
    updateUser({ status: EUserStatus.done });
  }, []);

  const count = {
    count: needsMouthmaskAmount,
  };

  const layout = {
    xs: { span: 24 },
    sm: { span: 12 },
  };

  return (
    <Row>
      <Col {...grid}>
        <div style={{ paddingBottom: 16 }}>
          <SearchSteps current={3} />
          <Disguise />
        </div>
        <Row gutter={{ xs: 0, sm: 8 }}>
          <Col {...layout}>
            <Card
              title={t("requestor.contact.title", {
                distance: superhero.relation.distance,
              })}
              style={{ marginBottom: 16 }}
            >
              <Space
                size="large"
                direction="vertical"
                style={{ width: "100%" }}
              >
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
                    <Whatsapp
                      message="Dag superheld"
                      number={superhero.user.whatsapp}
                    />
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
                      <Button onClick={() => notImplemented()}>
                        {t("no")}
                      </Button>
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
          <Col {...layout}>
            <Alert
              type="warning"
              message={t("safetyTitle")}
              description={
                <Typography>
                  <Paragraph>
                    {t("requestor.contact.alert.description")}
                  </Paragraph>
                  <Text>
                    Alle info over hoe je een mondmasker draagt, vind je op:{" "}
                    <a href="https://maakjemondmasker.be" target="_blank">
                      maakjemondmasker.be
                    </a>
                  </Text>
                </Typography>
              }
            />
            <Typography style={{ padding: 16 }}>
              <Paragraph>
                Nu hebben jullie mekaars contactgegevens. Contacteer je
                superheld en spreek af hoe je de overhandiging kan laten
                gebeuren.
              </Paragraph>
              <Paragraph>
                Indien jij de maskers gaat afhalen, probeer indien mogelijk met
                de fiets te gaan. Hou afstand en was je handen voor en na de
                overhandiging.
              </Paragraph>
              <Paragraph>
                {superhero.user.name} is een vrijwilliger. Wees dankbaar, wees
                vriendelijk, heb geduld.
              </Paragraph>
            </Typography>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <CancelButton
            name={superhero.user.name}
            needsMouthmaskAmount={needsMouthmaskAmount}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SuperheroContactInfo;
