import { useUser } from "../../base/user";
import { HeroTitle } from "./HeroTitle";
import { ToggleableWidget } from "../ToggleableWidget";

export const MakeMouthmask = () => {
  const { user } = useUser();

  return (
    <ToggleableWidget
      title="Ik heb een naaimachine"
      toggleField="isMaker"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      <HeroTitle numDelivered={user.numDelivered} />
    </ToggleableWidget>
  );
};
