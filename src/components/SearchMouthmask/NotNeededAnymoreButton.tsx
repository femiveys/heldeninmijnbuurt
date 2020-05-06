import { Button } from "antd";
import { useApi, useUser, useGoto } from "../../hooks";

const NotNeededAnymoreButton = () => {
  const goto = useGoto();
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
        await goto();
      }}
      style={{ fontSize: 10 }}
    >
      Ik heb toch geen mondmaskers meer nodig
    </Button>
  );
};

export default NotNeededAnymoreButton;
