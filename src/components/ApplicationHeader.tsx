import { useCallback } from "react";
import { Button, Avatar, Row, Col, Menu, Dropdown } from "antd";
import firebase from "firebase/app";
import { store } from "../store";
import { useAuth } from "../hooks";
import { MenuOutlined } from "@ant-design/icons";

const ApplicationHeader = () => {
  const { firebaseUser, isLoggedIn } = useAuth();

  const onLogout = useCallback(async () => {
    await firebase.auth().signOut();
    store.dispatch("user/setUser", null);
  }, []);

  const style = {
    padding: 16,
  };

  const menu = (
    <Menu theme="dark">
      <Menu.Item style={style}>Menu</Menu.Item>
      <Menu.Item style={style}>Menu</Menu.Item>
      <Menu.Item style={style}>Menu</Menu.Item>
      <Menu.Item style={style}>Menu</Menu.Item>
      <Menu.Item style={style}>Menu</Menu.Item>
    </Menu>
  );

  return (
    <Row justify="space-between">
      <Col>
        <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
          <Button
            type="link"
            style={{ marginTop: 16 }}
            icon={<MenuOutlined style={{ color: "white", fontSize: 32 }} />}
          ></Button>
        </Dropdown>
      </Col>
      <Col>
        {isLoggedIn && <Button onClick={onLogout}>Uitloggen</Button>}
        {firebaseUser && (
          <Avatar shape="square" src={firebaseUser.photoURL || undefined} />
        )}
      </Col>
    </Row>
  );
};

export default ApplicationHeader;
