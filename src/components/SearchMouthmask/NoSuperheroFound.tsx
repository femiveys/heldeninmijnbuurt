import { Row, Col, Typography, Result } from "antd";
import { grid } from "../../helpers";
import ShareButton from "../ShareButton";
import NotNeededAnymoreButton from "./NotNeededAnymoreButton";
import SearchSteps from "./SearchSteps";
import GlobalStats from "../GlobalStats";
import LocalStats from "./LocalStats";

const { Paragraph } = Typography;

const NoSuperheroFound = () => {
  return (
    <Row>
      <Col {...grid}>
        <SearchSteps current={1} />
        <Result
          title="Geen superheld in je buurt"
          subTitle={
            <Typography
              style={{ maxWidth: 450, margin: "auto", textAlign: "left" }}
            >
              <Paragraph>
                We hebben jammergenoeg geen superheld in je buurt gevonden die
                maskers heeft. We blijven zoeken en zullen je een <b>e-mail</b>{" "}
                sturen zodra we iemand vinden.
              </Paragraph>
              <Paragraph>
                Hou dus zeker je <b>mailbox</b> in de gaten.
              </Paragraph>
              <Paragraph>
                Je kan helpen door dit platform op sociale media te delen.
                Misschien vinden we zo wel iemand.
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
};

export default NoSuperheroFound;
