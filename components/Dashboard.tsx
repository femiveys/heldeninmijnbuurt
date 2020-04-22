import { useUser } from "../base/user";
import { EnterStreet } from "./EnterStreet";

export const Dashboard = () => {
  const { refreshUser, fetchingUser, user } = useUser();

  if (!user) {
    return <EnterStreet />;
  } else {
    return <div>Dashboard</div>;
  }
};
