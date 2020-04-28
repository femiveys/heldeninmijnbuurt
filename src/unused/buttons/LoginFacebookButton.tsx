import { BaseButton } from "./BaseButton";
import firebase from "firebase/app";
import { CSSProperties } from "react";

type TProps = {
  style?: CSSProperties;
};
export const LoginFacebookButton = ({ style }: TProps) => {
  return (
    <BaseButton
      text="Login met Facebook"
      primary
      style={style}
      onClick={() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      }}
    />
  );
};
