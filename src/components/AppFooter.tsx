import Link from "next/link";
import { grid, contactEmail } from "../helpers";
import { Row, Col, Space } from "antd";
import { useUser } from "../hooks";

const AppFooter = () => {
  const { user } = useUser();

  return (
    <Row>
      <Col {...grid} style={{ padding: 16 }}>
        <Space>
          <Link href="/privacy">
            <a className="inverted">Privacy policy</a>
          </Link>
          <Link href="/general">
            <a className="inverted">Algemene voorwaarden</a>
          </Link>
          {user && (
            <a className="inverted" href={`mailto:${contactEmail}`}>
              Contact
            </a>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default AppFooter;
