import { useUser } from "../../hooks";
import CancelButton from "./CancelButton";
import { useTranslation, Trans } from "react-i18next";
import { Row, Col, Typography, Result } from "antd";
import { grid } from "../../helpers";
import ShareButton from "../ShareButton";
import SearchSteps from "./SearchSteps";
import Disguise from "./Disguise";
import GlobalStats from "../GlobalStats";
import LocalStats from "./LocalStats";

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
        <Disguise />
        <Result
          status="success"
          title="We hebben een superheld in jouw buurt gevonden"
          subTitle={
            <div>
              <Typography style={{ textAlign: "left" }}>
                <Paragraph>
                  <Trans
                    i18nKey="requestor.waiting.par1"
                    values={{ distance }}
                    components={[<b />]}
                  />
                </Paragraph>
                <Paragraph>
                  <Trans i18nKey="requestor.waiting.par2" />
                </Paragraph>
                <Paragraph>
                  <Trans i18nKey="requestor.waiting.par3" />
                </Paragraph>
                <Paragraph>
                  <Trans i18nKey="requestor.waiting.par4" />
                </Paragraph>
              </Typography>
              <GlobalStats />
              <LocalStats />
            </div>
          }
          extra={[
            <ShareButton key="share" style={{ marginBottom: 32 }} />,
            <CancelButton
              key="cancel"
              name={t("thePerson")}
              needsMouthmaskAmount={user.needsMouthmaskAmount}
            />,
          ]}
        />
      </Col>
    </Row>
  );
};

export default WaitingForAcceptance;
