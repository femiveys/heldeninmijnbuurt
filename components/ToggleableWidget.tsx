import { useCallback, useState } from "react";
import { Row, Col, Checkbox, Popconfirm, Space } from "antd";
import { useUser } from "../base/user";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { TUser } from "../types";

type TProps = {
  title: string;
  toggleOffConfirmText: string;
  toggleField: keyof TUser; // TODO: explain that it should be a boolean
};

export const ToggleableWidget: React.FunctionComponent<TProps> = (props) => {
  const { updateUser, user } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);

  const onToggleOffConfirmed = useCallback(() => {
    updateUser({ [props.toggleField]: false });
    setShowConfirm(false);
  }, []);

  const onCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  const onChange = useCallback((e: CheckboxChangeEvent) => {
    // If we come from unchecked to checked, we can update
    if (e.target.checked) updateUser({ [props.toggleField]: true });
    // Otherwise we need to show the confirmation
    else setShowConfirm(true);
  }, []);

  // TODO: explain in type that it should be a boolean
  const checked = user[props.toggleField] as boolean;

  return (
    <Row className="toggleable-widget">
      <Col span={24}>
        <div className="widget-header">
          <Space>
            <Popconfirm
              title={props.toggleOffConfirmText}
              placement="bottomLeft"
              visible={showConfirm}
              onConfirm={onToggleOffConfirmed}
              onCancel={onCancel}
              okText="Ja"
              cancelText="Nee"
            >
              <Checkbox checked={checked} onChange={onChange} />
            </Popconfirm>
            <div className="title">{props.title}</div>
          </Space>
        </div>
        {checked && <div className="padding">{props.children}</div>}
      </Col>
    </Row>
  );
};
