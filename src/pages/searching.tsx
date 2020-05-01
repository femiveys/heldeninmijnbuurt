import { useEffect } from "react";
import { useRouter } from "next/router";
import FullSpinner from "../components/FullSpinner";
import { useUser } from "../hooks";
import { SearchMouthmask } from "../components/SearchMouthmask/SearchMouthmask";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  return user && user.needsMouthmask ? <SearchMouthmask /> : <FullSpinner />;
};
