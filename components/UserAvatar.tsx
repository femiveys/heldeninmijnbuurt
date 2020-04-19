import { CSSProperties } from "react";
import { useStoreon } from "storeon/react";
import styled from "styled-components";

type TProps = {
  style?: CSSProperties;
  imageUrl?: string;
};

export const UserAvatar = (props: TProps) => {
  const { style, imageUrl } = props;

  return (
    <Circle
      style={{
        backgroundImage: `url(${imageUrl})`,
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
