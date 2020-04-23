import { useUser } from "../base/user";
import { EnterStreet } from "./EnterStreet";
import { MakeMouthmask } from "./MakeMouthmask";
import { SearchMouthmask } from "./SearchMouthmask";
import { Space } from "antd";

export const Dashboard = () => {
  const { refreshUser, fetchingUser, user } = useUser();

  if (!user) {
    return <EnterStreet />;
  } else {
    return (
      <div id="dashboard">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <SearchMouthmask />
          <MakeMouthmask />
        </Space>
      </div>
    );
  }
};
