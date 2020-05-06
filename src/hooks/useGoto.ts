import { useRouter } from "next/router";

export const useGoto = () => {
  const router = useRouter();

  const goto = (path?: string) =>
    router.replace(path || "/", undefined, { shallow: true });

  return goto;
};
