import { useCallback } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Card, Space, Typography, Row, Col, Button, Alert } from "antd";
import {
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useApi, useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { TRelationUser, EUserStatus } from "../../types";
import { grid, share, appName } from "../../helpers";
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
    share(
      t,
      t("requestor.contact.share.body", { count: needsMouthmaskAmount }),
      t("requestor.contact.share.message", {
        count: needsMouthmaskAmount,
        appName,
      })
    );

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
                      message={t("requestor.whatsapp.message")}
                      number={superhero.user.whatsapp}
                    />
                  </Space>
                )}
                {superhero.relation.heroHandoverDate ? (
                  <div>
                    <Paragraph>
                      <Trans
                        i18nKey="requestor.contact.heroMarkedAsHandedOver"
                        {...count}
                      />
                    </Paragraph>
                    <Space>
                      <Button
                        type="primary"
                        onClick={markAsHandedOver}
                        loading={isMarkingAsHandedOver}
                      >
                        {t("yes")}
                      </Button>
                      {/*
                        <Button onClick={() => notImplemented()}>
                          {t("no")}
                        </Button>

                         */}
                    </Space>
                  </div>
                ) : (
                  <Button
                    block
                    type="primary"
                    onClick={markAsHandedOver}
                    loading={isMarkingAsHandedOver}
                  >
                    <Trans
                      i18nKey="requestor.contact.received"
                      values={count}
                    />
                  </Button>
                )}
              </Space>
            </Card>
          </Col>
          <Col {...layout}>
            <Alert
              type="warning"
              message={<Trans i18nKey="safetyTitle" />}
              description={
                <Typography>
                  <Paragraph>
                    <Trans i18nKey="requestor.contact.alert.description" />
                  </Paragraph>
                  <Text>
                    <Trans
                      i18nKey="requestor.contact.info"
                      components={[
                        <a
                          href="https://maakjemondmasker.be"
                          target="_blank"
                        />,
                      ]}
                    />
                  </Text>
                </Typography>
              }
            />
            <Typography style={{ padding: 16 }}>
              <Paragraph>
                <Trans i18nKey="requestor.contact.par1" />
              </Paragraph>
              <Paragraph>
                <Trans i18nKey="requestor.contact.par2" />
              </Paragraph>
              <Paragraph>
                <Trans
                  i18nKey="requestor.contact.par3"
                  values={{ name: superhero.user.name }}
                />
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
