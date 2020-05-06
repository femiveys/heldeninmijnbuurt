import { Row, Col } from "antd";
import { grid } from "../helpers";
import GeneralConditions from "../components/GeneralConditions";

export default () => (
  <Row>
    <Col {...grid} style={{ padding: 16 }}>
      <GeneralConditions />
    </Col>
  </Row>
);
