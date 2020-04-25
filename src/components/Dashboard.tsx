import { Space } from "antd";
import { EnterStreet } from "./EnterStreet";
import { MakeMouthmask } from "./MakeMouthmask";
import { SearchMouthmask } from "./SearchMouthmask";
import { useUser } from "../hooks";

export const Dashboard = () => {
  const { fetchingUser, user } = useUser();

  if (!user && !fetchingUser) {
    return <EnterStreet />;
  } else if (user) {
    return (
      <Space
        className="dashboard"
        direction="vertical"
        size="large"
        style={{ width: "100%" }}
      >
        <SearchMouthmask />
        <MakeMouthmask />
      </Space>
    );
  } else {
    return null;
  }
};
