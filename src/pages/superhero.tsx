import { useRouter } from "next/router";
import { useUser } from "../hooks";
import FullSpinner from "../components/FullSpinner";
import { MakeMouthmask } from "../components/MakeMouthmask";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  if (user && user.isMaker) {
    return <MakeMouthmask />;
  } else {
    router.replace("/");
    return <FullSpinner />;
  }
};
