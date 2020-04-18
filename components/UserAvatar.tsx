import { CSSProperties } from "react";
import { useStoreon } from "storeon/react";
import styled from "styled-components";

type TProps = {
  style?: CSSProperties;
};

export const UserAvatar = (props: TProps) => {
  const { style } = props;
  const { user } = useStoreon("user");

  return (
    <Circle
      style={{
        backgroundImage: `url(${user?.picture})`,
        ...style,
      }}
    />
  );
};

const Circle = styled.div`
  background-color: #eee;
  border-radius: 100px;
  width: 22px;
  height: 22px;
  background-size: cover;
  background-position: center;
`;
