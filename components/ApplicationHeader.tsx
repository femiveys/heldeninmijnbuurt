import { Button, Avatar, Row, Col } from "antd";
import { useAuth } from "../base/auth";

export const ApplicationHeader = () => {
  const { firebaseUser } = useAuth();
  return (
    <Row justify="end">
      <Col>
        <Button>Logout</Button>
        <Avatar shape="square" src={firebaseUser?.photoURL || undefined} />
      </Col>
    </Row>
  );
};
