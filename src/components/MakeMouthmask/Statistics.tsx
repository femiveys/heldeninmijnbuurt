import { useTranslation } from "react-i18next";
import { Space, Statistic, Row, Col } from "antd";
import MaskStock from "./MaskStock";
import { useUser } from "../../hooks";

const Statistics = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  // let text: string;
  // if (numDelivered === 0) {
  //   text = t("maker.heroTitle.zero");
  // } else if (numDelivered < 20) {
  //   text = t("maker.heroTitle.few");
  // } else {
  //   text = t("maker.heroTitle.many");
  // }

  return (
    <Row justify="space-around">
      <Col>
        {user?.numDelivered && (
          <Statistic title="Maskers overhandigd" value={user.numDelivered} />
        )}
      </Col>
      <Col>
        <Statistic
          title={t("maker.available.label")}
          value={user?.maskStock.toString()}
          formatter={(value) => <MaskStock stock={value.toString()} />}
        />
      </Col>
    </Row>
  );
};

export default Statistics;
