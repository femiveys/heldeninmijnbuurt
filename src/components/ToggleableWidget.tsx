import { Row, Col, Checkbox, Space, Spin } from "antd";

import "./styles.less";

type TProps = {
  title: string;
  isOpen: boolean;
  onToggle: (() => void) | null;
  isToggling: boolean;
};

export const ToggleableWidget: React.FunctionComponent<TProps> = (props) => {
  const { title, isOpen, onToggle, isToggling, children } = props;

  return (
    <Row className="toggleable-widget">
      <Col span={24}>
        <Space className="widget-header">
          {isToggling ? (
            <Spin
              size="small"
              style={{ marginLeft: "1px", marginRight: "1px" }}
            />
          ) : (
            <Checkbox
              checked={isOpen}
              disabled={!onToggle}
              onChange={onToggle || (() => {})}
            />
          )}
          <span className="title">{title}</span>
        </Space>
        {isOpen && <div className="widget-header-body">{children}</div>}
      </Col>
    </Row>
  );
};
