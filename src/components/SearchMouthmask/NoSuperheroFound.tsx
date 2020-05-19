import { Row, Col, Typography, Result } from "antd";
import { Trans } from "react-i18next";
import { grid } from "../../helpers";
import ShareButton from "../ShareButton";
import NotNeededAnymoreButton from "./NotNeededAnymoreButton";
import SearchSteps from "./SearchSteps";
import GlobalStats from "../GlobalStats";
import LocalStats from "./LocalStats";

const { Paragraph } = Typography;

const NoSuperheroFound = () => (
  <Row>
    <Col {...grid}>
      <SearchSteps current={1} />
      <Result
        title={<Trans i18nKey="requestor.notFound.title" />}
        subTitle={
          <Typography
            style={{ maxWidth: 450, margin: "auto", textAlign: "left" }}
          >
            <Paragraph>
              <Trans i18nKey="requestor.notFound.par1" components={[<b />]} />
            </Paragraph>
            <Paragraph>
              <Trans i18nKey="requestor.notFound.par2" components={[<b />]} />
            </Paragraph>
            <Paragraph>
              <Trans i18nKey="requestor.notFound.par3" />
            </Paragraph>
            <GlobalStats />
            <LocalStats />
          </Typography>
        }
        extra={[
          <ShareButton key="share" style={{ marginBottom: 32 }} />,
          <NotNeededAnymoreButton key="notNeeded" />,
        ]}
      />
    </Col>
  </Row>
);

export default NoSuperheroFound;
