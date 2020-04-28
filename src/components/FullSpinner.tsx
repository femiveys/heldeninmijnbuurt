import { Row, Col, Spin } from "antd";

export const FullSpinner = () => (
  <Row
    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    justify="center"
    align="middle"
  >
    <Col>
      <Spin size="large" />
    </Col>
  </Row>
);
