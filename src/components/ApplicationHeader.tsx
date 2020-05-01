import { Button, Row, Col, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { grid } from "../helpers";
import PersonalMenu from "./PersonalMenu";

const ApplicationHeader = () => {
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
    <Row>
      <Col {...grid}>
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
            <PersonalMenu />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ApplicationHeader;
