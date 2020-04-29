import { useCallback } from "react";
import { Button, Avatar, Row, Col } from "antd";
import firebase from "firebase/app";
import { store } from "../store";
import { useAuth } from "../hooks";

const ApplicationHeader = () => {
  const { firebaseUser, isLoggedIn } = useAuth();

  const onLogout = useCallback(async () => {
    await firebase.auth().signOut();
    store.dispatch("user/setUser", null);
  }, []);

  return (
    <Row justify="end">
      <Col>
        {isLoggedIn && <Button onClick={onLogout}>Logout</Button>}
        {firebaseUser && (
          <Avatar shape="square" src={firebaseUser.photoURL || undefined} />
        )}
      </Col>
    </Row>
  );
};

export default ApplicationHeader;
