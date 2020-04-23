import { ToggleableWidget } from "../ToggleableWidget";
import { useUser } from "../../base/user";
import { EnterMouthmaskAmount } from "./EnterMouthmaskAmount";

export const SearchMouthmask = () => {
  const { user } = useUser();

  return (
    <ToggleableWidget
      title="Ik zoek mondmaskers"
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      {user.needsMouthmaskAmount === 0 && <EnterMouthmaskAmount />}
    </ToggleableWidget>
  );
};
