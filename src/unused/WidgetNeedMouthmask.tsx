import React from "react";
import { UIWidget } from "../../components/UIWidget";
import { useUser } from "../../base/user";
import { useSmartForm } from "../../components/SmartForm/useSmartForm";
import { SmartFormField } from "../../components/SmartForm/SmartFormField";
import { BaseButton } from "../../components/buttons/BaseButton";
import { apiCall } from "../../axios";
import { message } from "antd";
import { store } from "../../store";

export const WidgetNeedMouthmask = () => {
  const { user } = useUser();
  const form = useSmartForm(user);

  const toggleFieldName = "needs_mouthmask";
  const active = form.values?.[toggleFieldName] ? true : false;

  return (
    <UIWidget
      title="Ik heb mondmasker(s) nodig"
      active={active}
      onToggle={async () => {
        if (active) {
          // Turned off
          const confirmed = await confirm(
            "Ben je zeker? Je zal dit niet meer kunnen aanzetten"
          );
          if (confirmed) {
            form.setValue(toggleFieldName, false);
            try {
              await apiCall("PUT", "me/mouthmask", {
                needs_mouthmask: 0,
              });
              store.dispatch("user/setUser", {
                ...user,
                needsMouthmask: false,
                needsMouthmaskAmount: 0,
              });
              message.success("Je hebt geen mondmaskers meer nodig");
            } catch (error) {
              message.error("Er ging iets fout. Probeer opnieuw");
            }
          }
        } else {
          form.setValue(toggleFieldName, true);
        }
      }}
    >
      {active && (
        <>
          <div>
            <p>
              Vraag enkel wat je nodig hebt. Als iedereen 5 mondmaskers
              aanvraagt, zal jij of iemand anders langer moeten wachten op de
              zijne.
            </p>
            <SmartFormField
              name="needs_mouthmask_amount"
              label="Hoeveel mondmasker(s) heb je nodig?"
              type="number"
              form={form}
              disabled={!!user?.needsMouthmaskAmount}
            />
            {!user?.needsMouthmaskAmount && (
              <BaseButton
                text="Vraag maskers aan"
                primary
                onClick={async () => {
                  console.log(form.collectValues());
                  try {
                    await apiCall("POST", "me/mouthmask", form.collectValues());
                    message.success("Je aanvraag werd ingediend.");
                    await store.dispatch("user/setUser", {
                      ...user,
                      needsMouthmask: true,
                      needsMouthmaskAmount: form.collectValues()
                        ?.needsMouthmaskAmount,
                    });
                  } catch (error) {
                    message.error("Er ging iets fout. Probeer opnieuw!");
                  }
                }}
              />
            )}
          </div>
        </>
      )}
    </UIWidget>
  );
};