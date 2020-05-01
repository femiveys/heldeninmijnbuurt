import { useRouter } from "next/router";
import FullSpinner from "../components/FullSpinner";
import { useUser } from "../hooks";
import { SearchMouthmask } from "../components/SearchMouthmask/SearchMouthmask";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  if (user && user.needsMouthmask) {
    return <SearchMouthmask />;
  } else {
    router.replace("/");
    return <FullSpinner />;
  }
};
