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
          subTitle="Nog wat uitleg over waarom delen op FB belangrijk is..."
          extra={[
            <Space
              key="extra"
              direction="vertical"
              size="large"
              style={{ width: "100%" }}
            >
              <ShareButton text="Deel op sociale media" />
              {showAppreciation && <Appreciation showStars={false} />}
              <Button onClick={() => goto()}>Word zelf een superheld</Button>
            </Space>,
          ]}
        />
      </Col>
    </Row>
  );
};

export default Done;
