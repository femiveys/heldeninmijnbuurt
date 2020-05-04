import { useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography, Result } from "antd";
import { grid, formatLengthDistance } from "../../helpers";
import ShareButton from "../ShareButton";
import SearchSteps from "./SearchSteps";

const { Paragraph } = Typography;

type TProps = {
  distance: number;
};

const WaitingForAcceptance = ({ distance }: TProps) => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <Row>
      <Col {...grid}>
        <SearchSteps current={2} />
        <Result
          status="success"
          title="We hebben een superheld in jouw buurt gevonden"
          subTitle={
            <Typography
              style={{ maxWidth: 450, margin: "auto", textAlign: "left" }}
            >
              <Paragraph>
                We hebben op <strong>{formatLengthDistance(distance)}</strong>{" "}
                iemand gevonden die maskers heeft. We hebben een mail gestuurd
                en nu wachten we tot hij of zij je aanvraag aanvaardt.
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
            <ShareButton key="share" style={{ marginBottom: 32 }} />,
            <CancelButton
              key="cancel"
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
