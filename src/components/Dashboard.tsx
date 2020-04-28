import { Space } from "antd";
import { EnterStreet } from "./EnterStreet";
import { MakeMouthmask } from "./MakeMouthmask";
import { SearchMouthmask } from "./SearchMouthmask";
import { useUser } from "../hooks";
import { FullSpinner } from "./FullSpinner";

export const Dashboard = () => {
  const { isFetchingUser, user } = useUser();

  return user && user.streetId ? (
    <Space
      className="dashboard"
      direction="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      <SearchMouthmask />
      <MakeMouthmask />
    </Space>
  ) : isFetchingUser ? (
    <FullSpinner />
  ) : (
    <EnterStreet />
  );
};
