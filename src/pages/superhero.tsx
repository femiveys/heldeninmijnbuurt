import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import { MakeMouthmask } from "../components/MakeMouthmask/MakeMouthmask";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  return user && user.isMaker ? <MakeMouthmask /> : <FullSpinner />;
};
