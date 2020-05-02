import { MenuOutlined } from "@ant-design/icons";
import { useUser } from "../hooks";
import { Dropdown, Button, Menu } from "antd";

const style = {
  padding: 16,
};

const menu = (
  <Menu theme="dark">
    <Menu.Item style={style}>Ik wil naaien</Menu.Item>
    <Menu.Item style={style}>Ik zoek een mondmasker</Menu.Item>
  </Menu>
);

const AppMenu = () => {
  const { user } = useUser();

  return (
    user && (
      <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
        <Button
          type="link"
          style={{ marginTop: 16 }}
          icon={<MenuOutlined style={{ color: "white", fontSize: 32 }} />}
        ></Button>
      </Dropdown>
    )
  );
};

export default AppMenu;
