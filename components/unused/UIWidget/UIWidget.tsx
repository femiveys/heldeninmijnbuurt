import React, { FunctionComponent } from "react";
import classnames from "classnames";
import { Checkbox } from "antd";

type TProps = {
  title: string;
  active?: boolean;
  onToggle: () => void;
};

export const UIWidget: FunctionComponent<TProps> = (props) => {
  const { children, active, onToggle, title } = props;
  return (
    <div
      className={classnames({
        widget: true,
        active,
      })}
    >
      <div className="widget--inner">
        <h3 style={{ marginBottom: 0 }}>
          <label style={{ cursor: "pointer" }}>
            <Checkbox
              style={{ marginRight: 10 }}
              checked={active}
              onChange={async (e) => {
                onToggle();
              }}
            />
            {title}
          </label>
        </h3>
        {children}
      </div>
    </div>
  );
};
