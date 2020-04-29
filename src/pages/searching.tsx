import { useRouter } from "next/router";
import { SearchMouthmask } from "../components/SearchMouthmask";
import FullSpinner from "../components/FullSpinner";
import { useUser } from "../hooks";

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
