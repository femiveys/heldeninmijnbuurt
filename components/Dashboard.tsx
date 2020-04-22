import { useUser } from "../base/user";
import { EnterStreet } from "./EnterStreet";
import { MakeMouthmask } from "./MakeMouthmask";
import { SearchMouthmask } from "./SearchMouthmask";

export const Dashboard = () => {
  const { refreshUser, fetchingUser, user } = useUser();

  if (!user) {
    return <EnterStreet />;
  } else {
    return (
      <div id="dashboard">
        <MakeMouthmask />
        <SearchMouthmask />
      </div>
    );
  }
};
