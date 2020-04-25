import firebase from "firebase/app";
import { BaseButton } from "./BaseButton";
import { store } from "../../store";

export const LogoutButton = () => {
  return (
    <BaseButton
      text="Logout"
      onClick={() => {
        firebase.auth().signOut();
        store.dispatch("user/setUser", null);
      }}
    />
  );
};