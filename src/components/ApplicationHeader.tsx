import { Row, Col, Menu } from "antd";
import { grid } from "../helpers";
import PersonalMenu from "./PersonalMenu";

const ApplicationHeader = () => (
  <Row>
    <Col {...grid}>
      <Row justify="space-between">
        <Col>
          <Menu />
        </Col>
        <Col>
          <PersonalMenu />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default ApplicationHeader;
