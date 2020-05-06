import { Row, Col } from "antd";
import Link from "next/link";
import PersonalMenu from "./PersonalMenu";
import { grid, appName } from "../helpers";

const AppHeader = () => (
  <Row>
    <Col {...grid}>
      <Row justify="space-between">
        <Col>
          <Link href="/">
            <a style={{ color: "white", padding: "8px 16px", fontSize: 16 }}>
              {appName}
            </a>
          </Link>
        </Col>
        <Col>
          <PersonalMenu />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default AppHeader;
