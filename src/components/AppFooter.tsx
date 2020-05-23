import Link from "next/link";
import { Trans } from "react-i18next";
import { Row, Col, Space } from "antd";
import { useUser } from "../hooks";
import { grid, contactEmail } from "../helpers";

const AppFooter = () => {
  const { user } = useUser();

  return (
    <Row>
      <Col {...grid} style={{ padding: 16 }}>
        <Space>
          <Link href="/privacy">
            <a className="inverted">
              <Trans i18nKey="privacy" />
            </a>
          </Link>
          <Link href="/general">
            <a className="inverted">
              <Trans i18nKey="general" />
            </a>
          </Link>
          {user && (
            <a
              target="_blank"
              className="inverted"
              href={`mailto:${contactEmail}`}
            >
              <Trans i18nKey="contact" />
            </a>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default AppFooter;
