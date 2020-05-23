import { Space, Result, Button, Col, Row } from "antd";
import { Trans } from "react-i18next";
import Appreciation from "./Appreciation";
import { useGoto } from "../../hooks";
import { grid } from "../../helpers";
import SearchSteps from "./SearchSteps";
import Disguise from "./Disguise";

type TProps = {
  needsMouthmaskAmount: number;
  showAppreciation: boolean;
};

const Done = ({ needsMouthmaskAmount, showAppreciation }: TProps) => {
  const goto = useGoto();

  return (
    <Row>
      <Col {...grid}>
        <SearchSteps current={4} />
        <Disguise />
        <Result
          status="success"
          title={
            <Trans
              count={needsMouthmaskAmount}
              i18nKey="requestor.done.title"
            />
          }
          extra={[
            <Space
              key="extra"
              direction="vertical"
              size="large"
              style={{ width: "100%" }}
            >
              {showAppreciation && <Appreciation showStars={false} />}
              <Button type="primary" onClick={() => goto()}>
                <Trans i18nKey="requestor.done.label" />
              </Button>
            </Space>,
          ]}
        />
      </Col>
    </Row>
  );
};

export default Done;
