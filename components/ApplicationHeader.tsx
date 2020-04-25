import { useCallback } from "react";
import { Button, Avatar, Row, Col } from "antd";
import { useAuth } from "../base/auth";
import firebase from "firebase";
import { store } from "../store";

export const ApplicationHeader = () => {
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
