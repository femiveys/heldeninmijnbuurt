import { ToggleableWidget } from "../ToggleableWidget";

export const MakeMouthmask = () => {
  return (
    <ToggleableWidget
      title="Ik heb een naaimachine"
      toggleField="isMaker"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      tete
    </ToggleableWidget>
  );
};
