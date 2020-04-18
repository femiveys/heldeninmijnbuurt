import { CSSProperties } from "react";
import firebase from "firebase/app";
import { BaseButton } from "./BaseButton";

type TProps = {
  style?: CSSProperties;
};

export const LoginGoogleButton = ({ style }: TProps) => {
  return (
    <BaseButton
      text="Login met Google"
      primary
      style={style}
      className="weight-600"
      onClick={() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      }}
    />
  );
};
