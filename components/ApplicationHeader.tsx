import { Button, Avatar } from "antd";
import { useAuth } from "../base/auth";

export const ApplicationHeader = () => {
  const { firebaseUser } = useAuth();
  return (
    <div style={{ float: "right" }}>
      <Button>Logout</Button>
      <Avatar shape="square" src={firebaseUser?.photoURL} />
    </div>
  );
};
