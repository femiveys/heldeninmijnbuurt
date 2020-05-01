import { useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Result } from "antd";
import { grid } from "../../helpers";
import ShareButton from "../ShareButton";

const { Paragraph } = Typography;

const WaitingForAcceptance = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <Row>
      <Col {...grid}>
        <Result
          status="success"
          title="We hebben jouw superheld in de buurt gevonden"
          subTitle={
            <Typography
              style={{ maxWidth: 450, margin: "auto", textAlign: "left" }}
            >
              <Paragraph>
                We hebben iemand gevonden die maskers heeft. We hebben een mail
                gestuurd en nu wachten we tot hij of zij je aanvraag aanvaardt.
              </Paragraph>
              <Paragraph>
                Enkel het aantal maskers en de afstand is doorgegeven, dus geen
                persoonlijke informatie.
              </Paragraph>
              <Paragraph>
                Zodra je aanvraag aanvaard is, krijg je een mail en zal je de
                contact informatie vinden, zodat jullie het onderling kunnen
                regelen.
              </Paragraph>
              <Paragraph>
                In afwachting kan je wel aan zoveel mogelijk mensen over dit
                platform vertellen.
              </Paragraph>
            </Typography>
          }
          extra={[
            <ShareButton style={{ marginBottom: 32 }} />,
            <CancelButton
              name={t("thePerson")}
              needsMouthmaskAmount={Number(user?.needsMouthmaskAmount)}
            />,
          ]}
        />
      </Col>
    </Row>
  );
};

export default WaitingForAcceptance;
