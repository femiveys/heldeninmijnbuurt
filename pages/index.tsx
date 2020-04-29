import { useRouter } from "next/router";
import { useUser } from "../src/hooks";

export default () => {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    if (user.isMaker) router.replace("/superHero");
    else if (user.needsMouthmask) router.replace("/searching");
    else if (!user.streetId) router.replace("/new");
  }

  return null;
};
