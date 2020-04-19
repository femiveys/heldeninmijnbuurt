import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { Checkbox, message, Modal } from "antd";
import { pick } from "lodash";
import { TSmartFormField } from "../SmartForm/SmartFormField";
import { useSmartForm } from "../SmartForm/useSmartForm";
import { SmartForm } from "../SmartForm";
import { sleep } from "../../helpers";
import { apiCall } from "../../axios";
import { useUser } from "../../base/user";

type TProps = {
  title: string;
  toggleField?: {
    name: string;
    active?: boolean;
  };
  fields: TSmartFormField[];
  onToggle?: () => void;
};

export const Widget = (props: TProps) => {
  const { title, fields, toggleField, onToggle } = props;

  const { user } = useUser();
  const form = useSmartForm(user);

  const toggleFieldValue = toggleField && form.values?.[toggleField.name];
  const showForm = toggleField ? toggleFieldValue : true;

  const saveChanges = useCallback(async () => {
    await apiCall(
      "PUT",
      "me",
      pick(form.collectValues(), [
        ...(fields.map((f) => f.name) as any),
        toggleField?.name,
      ])
    );
  }, [form.values]);

  const toggleActive = useCallback(async () => {
    if (toggleField) {
      form.setValue(toggleField.name, toggleFieldValue ? 0 : 1);
    }
    try {
      await saveChanges();
      message.success("Yay! Wijzigingen opgeslagen.");
    } catch (error) {
      message.error("Er ging iets fout. Probeer opnieuw");
    }
    showAreYourSureToToggle(false);
    await sleep(0);
    if (onToggle) onToggle();
  }, [form.setValue, toggleField?.name, toggleFieldValue]);
  const [areYouSureToToggle, showAreYourSureToToggle] = useState(false);

  return (
    <div
      className={classnames({
        widget: true,
        active: toggleFieldValue,
      })}
    >
      <div className="widget--inner">
        <h3 style={{ marginBottom: 0 }}>
          <label style={{ cursor: "pointer" }}>
            {toggleField && (
              <Checkbox
                style={{ marginRight: 10 }}
                checked={form.values?.[toggleField?.name]}
                onChange={async (_e) => {
                  toggleActive();
                }}
              />
            )}
            {title}
          </label>
        </h3>
        {showForm ? (
          <>
            <div style={{ height: 10 }} />
            <SmartForm form={form} fields={fields} onSubmit={saveChanges} />
          </>
        ) : null}
        <Modal
          title={title}
          visible={areYouSureToToggle}
          onOk={async () => {
            // ..
          }}
          onCancel={() => {
            showAreYourSureToToggle(false);
          }}
        >
          {toggleFieldValue
            ? `Ben je zeker dat je dit wilt afzetten? Mensen in de buurt zullen je zo niet meer kunnen vinden. Hou vol! Samen staan we sterk.`
            : `Oh, wat goed! Je staat op punt om dit aan te zetten. Samen staan we sterk!`}
        </Modal>
      </div>
    </div>
  );
};
