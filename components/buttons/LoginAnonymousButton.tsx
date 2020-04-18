import { BaseButton } from "./BaseButton";
import firebase from "firebase/app";
import { CSSProperties, useState } from "react";
import { store } from "../../store";
import { message } from "antd";

type TProps = {
  style?: CSSProperties;
};
export const LoginAnonymousButton = ({ style }: TProps) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <BaseButton
      text="Word superheld 💪"
      large
      primary
      style={style}
      isLoading={submitting}
      onClick={async () => {
        try {
          setSubmitting(true);
          await firebase.auth().signInAnonymously();
        } catch (error) {
          message.error("Er ging iets fout. Probeer nog eens :)");
        }
        setSubmitting(false);
      }}
    />
  );
};
