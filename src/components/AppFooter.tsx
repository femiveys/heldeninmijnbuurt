import Link from "next/link";
import { grid } from "../helpers";
import { Row, Col } from "antd";

const AppFooter = () => (
  <Row>
    <Col {...grid} style={{ padding: 16 }}>
      <div>
        <Link href="/privacy">
          <a className="inverted">Privacy policy</a>
        </Link>
      </div>
      <div>
        <Link href="/general">
          <a className="inverted">Algemene voorwaarden</a>
        </Link>
      </div>
    </Col>
  </Row>
);

export default AppFooter;
