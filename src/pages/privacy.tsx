import { Row, Col } from "antd";
import { grid } from "../helpers";
import PrivacyPolicy from "../components/PrivacyPolicy";

export default () => (
  <Row>
    <Col {...grid} style={{ padding: 16 }}>
      <PrivacyPolicy />
    </Col>
  </Row>
);
