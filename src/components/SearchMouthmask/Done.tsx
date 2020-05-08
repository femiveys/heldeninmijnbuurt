import { Space, Result, Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import Appreciation from "./Appreciation";
import ShareButton from "../ShareButton";
import { grid } from "../../helpers";
import SearchSteps from "./SearchSteps";
import Disguise from "./Disguise";
import { useGoto } from "../../hooks";

type TProps = {
  needsMouthmaskAmount: number;
  showAppreciation: boolean;
};

const Done = ({ needsMouthmaskAmount, showAppreciation }: TProps) => {
  const { t } = useTranslation();
  const goto = useGoto();

  return (
    <Row>
      <Col {...grid}>
        <SearchSteps current={4} />
        <Disguise />
        <Result
          status="success"
          title={t("requestor.done.title", { count: needsMouthmaskAmount })}
          extra={[
            <Space
              key="extra"
              direction="vertical"
              size="large"
              style={{ width: "100%" }}
            >
              {showAppreciation && <Appreciation showStars={false} />}
              <Button type="primary" onClick={() => goto()}>
                Word zelf een superheld
              </Button>
            </Space>,
          ]}
        />
      </Col>
    </Row>
  );
};

export default Done;
