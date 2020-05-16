import { Row, Col, Spin } from "antd";

type TProps = {
  tip?: string;
};

const FullSpinner = ({ tip }: TProps) => (
  <Row
    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    justify="center"
    align="middle"
  >
    <Col>
      <Spin size="large" tip={tip} />
    </Col>
  </Row>
);

export default FullSpinner;
