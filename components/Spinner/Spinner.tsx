import React, { CSSProperties } from "react";

type TProps = { style?: CSSProperties; color?: "white" | "blue" };

export const Spinner = (props: TProps) => {
  const { style, color = "white" } = props;
  return <div style={style} className={`spinner-${color}`}></div>;
};
