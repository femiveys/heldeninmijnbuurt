import firebase from "firebase/app";
import { BaseButton } from "./BaseButton";

export const LogoutButton = () => {
  return (
    <BaseButton
      text="Logout"
      onClick={() => {
        firebase.auth().signOut();
      }}
    />
  );
};
