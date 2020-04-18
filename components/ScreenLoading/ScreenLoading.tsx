import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type TProps = {};

export const ScreenLoading = (props: TProps) => {
  const {} = props;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="screen--loading">
      <Spin indicator={antIcon} size="large" />
    </div>
  );
};
