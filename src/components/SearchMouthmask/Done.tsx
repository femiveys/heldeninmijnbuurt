import { Row, Col, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import { notImplemented } from "../../helpers";
import { Star } from "./Star";

const { Title, Paragraph } = Typography;

type TProps = {
  needsMouthmaskAmount: number;
};

export const Done = (props: TProps) => {
  const { t } = useTranslation();

  return (
    <Row align="middle" justify="center">
      <Col>
        <Title level={3}>
          {t("requestor.done.title", { count: props.needsMouthmaskAmount })}
        </Title>
        <Paragraph>Nog wat uitleg ...</Paragraph>
        <Title level={4}>{t("requestor.done.support")}</Title>
        <Star />
        <Button type="primary" size="large" onClick={() => notImplemented()}>
          {t("requestor.done.share.facebook")}
        </Button>
      </Col>
    </Row>
  );
};
