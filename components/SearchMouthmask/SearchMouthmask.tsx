import { ToggleableWidget } from "../ToggleableWidget";

export const SearchMouthmask = () => {
  return (
    <ToggleableWidget
      title="Ik zoek mondmaskers"
      toggleField="needsMouthmask"
      toggleOffConfirmText="Ben je zeker enzovoort?"
    >
      tete
    </ToggleableWidget>
  );
};
