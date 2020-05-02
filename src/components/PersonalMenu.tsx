import { Menu, Dropdown, Button, Avatar } from "antd";
import firebase from "firebase/app";
import { useCallback } from "react";
import { useAuth, useUser } from "../hooks";
import { store } from "../store";
import { getStreetInUserLanguage } from "../helpers";

const PersonalMenu = () => {
  const { user } = useUser();
  const { firebaseUser, isLoggedIn } = useAuth();

  const onLogout = useCallback(async () => {
    await firebase.auth().signOut();
    store.dispatch("user/setUser", null);
  }, []);

  const menu = (
    <Menu theme="dark" className="inverted">
      {user && (
        <>
          <div style={{ padding: "5px 12px", textAlign: "right" }}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>
              {user.postalCode} {getStreetInUserLanguage(user)}
            </div>
          </div>
        </>
      )}
      <Menu.Item style={{ textAlign: "center" }}>
        {isLoggedIn && <Button onClick={onLogout}>Uitloggen</Button>}
      </Menu.Item>
    </Menu>
  );

  return firebaseUser ? (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <Button
        type="link"
        style={{ width: 54, height: 54, border: 0, marginRight: 5 }}
        icon={
          <Avatar
            size={54}
            shape="square"
            src={firebaseUser.photoURL || undefined}
          />
        }
      ></Button>
    </Dropdown>
  ) : null;
};

export default PersonalMenu;
