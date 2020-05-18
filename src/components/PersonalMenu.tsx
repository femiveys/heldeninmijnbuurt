import { Menu, Dropdown, Button, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useCallback, CSSProperties } from "react";
import firebase from "firebase/app";
import Link from "next/link";
import { useAuth, useUser } from "../hooks";
import { getTrimmedStreetInUserLanguage } from "../helpers";

const style: CSSProperties = { padding: "5px 12px", textAlign: "right" };

const link = (
  <Link href="/profile" replace shallow>
    <EditOutlined style={{ fontSize: 16 }} />
  </Link>
);

const PersonalMenu = () => {
  const { user } = useUser();
  const { firebaseUser, isLoggedIn } = useAuth();

  const onLogout = useCallback(async () => {
    await firebase.auth().signOut();
  }, []);

  const menu = (
    <Menu theme="dark" className="inverted">
      {user && (
        <>
          <div style={style}>
            <div>
              {user.name} {link}
            </div>
            {user.whatsapp && (
              <div>
                +32{user.whatsapp} {link}
              </div>
            )}
            <div>{user.email}</div>
            <div>
              {user.postalCode} {getTrimmedStreetInUserLanguage(user)}
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
