import React, { FunctionComponent, CSSProperties } from "react";
import classnames from "classnames";
import styled from "styled-components";
import { Spinner } from "../Spinner";

type TProps = {
  text: string;
  onClick: () => void;
  large?: boolean;
  primary?: boolean;
  className?: string;
  isLoading?: boolean;
  icon?: JSX.Element;
  style?: CSSProperties;
};

export const BaseButton: FunctionComponent<TProps> = (props) => {
  const {
    text,
    large,
    primary,
    className,
    onClick,
    isLoading,
    icon,
    style,
  } = props;

  return (
    <StyledButton
      onClick={onClick}
      className={classnames({
        btn: true,
        "btn-lg": large,
        "btn-primary": primary,
        [className || ""]: true,
      })}
      style={style}
    >
      {text}
      {isLoading ? (
        <Spinner style={{ marginLeft: 8 }} color={primary ? "white" : "blue"} />
      ) : null}
      {!isLoading ? icon : null}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: 5px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
