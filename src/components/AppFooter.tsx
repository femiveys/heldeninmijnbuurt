import Link from "next/link";
import { grid } from "../helpers";
import { Row, Col } from "antd";

const style = {
  color: "grey",
};

const AppFooter = () => (
  <Row>
    <Col {...grid} style={{ padding: 16 }}>
      <div>
        <Link href="/privacy">
          <a style={style}>Privacy policy</a>
        </Link>
      </div>
      <div>
        <Link href="/general">
          <a style={style}>Algemene voorwaarden</a>
        </Link>
      </div>
    </Col>
  </Row>
);

export default AppFooter;
