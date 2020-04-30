import { useTranslation } from "react-i18next";
import { Statistic, Row, Col } from "antd";
import MaskStock from "./MaskStock";
import { useUser } from "../../hooks";

type TProps = {
  fetchRequested: () => Promise<void>;
};

const Statistics = ({ fetchRequested }: TProps) => {
  const { t } = useTranslation();
  const { user } = useUser();

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
          formatter={(value) => (
            <MaskStock
              stock={value.toString()}
              fetchRequested={fetchRequested}
            />
          )}
        />
      </Col>
    </Row>
  );
};

export default Statistics;
