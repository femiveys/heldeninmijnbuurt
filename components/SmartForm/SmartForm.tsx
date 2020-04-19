import React, { useState } from "react";
import { message } from "antd";
import classnames from "classnames";
import { BaseButton } from "../buttons/BaseButton";
import { useSmartForm } from "./useSmartForm";
import { SmartFormField, TSmartFormField } from "./SmartFormField";

type TProps = {
  form: ReturnType<typeof useSmartForm>;
  fields: Omit<TSmartFormField, "form">[];
  onSubmit: (values: any) => void;
  debug?: boolean;
  submitButton?: {
    pulse?: boolean;
    text?: string;
  };
};

export const SmartForm = (props: TProps) => {
  const { fields, form, onSubmit, submitButton, debug = false } = props;

  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;
        try {
          setSubmitting(true);
          if (Object.keys(form.values).length > 0) {
            onSubmit(form.values);
          }
          message.success("Yesss. Info werd opgeslagen!");
        } catch (error) {
          message.error("Er ging iets fout. Probeer 'ns opnieuw?");
        }
        setSubmitting(false);
      }}
    >
      {fields.map((field) => (
        <SmartFormField key={field.name} {...field} form={form} />
      ))}

      <BaseButton
        text={submitButton?.text || "Bewaar"}
        primary
        className={classnames({
          pulse: submitButton?.pulse,
        })}
        isLoading={submitting}
        icon={
          <svg
            className="bi bi-arrow-right-short"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"
              clipRule="evenodd"
            />
          </svg>
        }
        onClick={async () => {
          // ...
        }}
      />
      {debug && <pre>{JSON.stringify(form.values, null, 2)}</pre>}
    </form>
  );
};
