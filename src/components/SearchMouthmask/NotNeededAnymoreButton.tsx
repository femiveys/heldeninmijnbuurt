import { Button } from "antd";
import { useRouter } from "next/router";
import { useApi, useUser } from "../../hooks";

const NotNeededAnymoreButton = () => {
  const router = useRouter();
  const { updateUser } = useUser();
  const {
    isLoading: isUnsettingNeedsMouthmask,
    callApi: unsetNeedsMouthmask,
  } = useApi("PUT", "me/action");

  return (
    <Button
      danger
      type="link"
      loading={isUnsettingNeedsMouthmask}
      onClick={async () => {
        await unsetNeedsMouthmask({ name: "unsetNeedsMouthmask" });
        updateUser({ needsMouthmask: false });
        await router.replace("/");
      }}
      style={{ fontSize: 10 }}
    >
      Ik heb toch geen mondmaskers meer nodig
    </Button>
  );
};

export default NotNeededAnymoreButton;
