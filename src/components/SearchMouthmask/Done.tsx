import { Space, Result, Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import Appreciation from "./Appreciation";
import ShareButton from "../ShareButton";
import { useRouter } from "next/router";
import { grid } from "../../helpers";

type TProps = {
  needsMouthmaskAmount: number;
  showAppreciation: boolean;
};

const Done = ({ needsMouthmaskAmount, showAppreciation }: TProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Row>
      <Col {...grid}>
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
              <Button onClick={() => router.replace("/")}>
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
