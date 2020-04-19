import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import classnames from "classnames";
import { useSmartForm } from "./useSmartForm";

type TProps = {
  form?: ReturnType<typeof useSmartForm>;
  label?: string;
  name: string;
  disabled?: boolean;
  type?: "text" | "number" | "dropdown" | "checkbox";
  render?: (_: {
    value: any;
    setValue: (value: any) => void;
  }) => JSX.Element | null;
  // value: any;
  // onChange: (value: any) => void;
};

export type TSmartFormField = TProps;

export const SmartFormField = (props: TProps) => {
  const { form, label, name, type = "text", disabled } = props;

  const valueRef = useRef<any>(form?.values?.[name]);
  const [localValue, setLocalValue] = useState<any>(valueRef.current);
  useEffect(() => {
    if (valueRef.current !== form?.values?.[name]) {
      valueRef.current = form?.values?.[name];
      setLocalValue(valueRef.current);
    }
  }, [form?.values, name]);

  const setValue = useCallback(
    (val: any) => {
      form?.setValue(name, val);
    },
    [form?.setValue, name]
  );

  const _onChange = useCallback(
    (e) => {
      let newValue = e.target.value;
      if (type === "number") {
        newValue = parseFloat(newValue);
      }
      if (type === "checkbox") {
        newValue = e.target.checked ? 1 : 0;
      }
      setValue(newValue);
    },
    [type, name, setValue]
  );

  const inputField = useMemo(() => {
    if (props.render) {
      return props.render({ value: localValue, setValue });
    }
    if (type === "text" || type === "number") {
      return (
        <input
          className="form-control"
          type={type}
          disabled={disabled}
          value={localValue || ""}
          onChange={_onChange}
        />
      );
    }
    if (type === "checkbox") {
      return (
        <input
          className="custom-control-input"
          type="checkbox"
          disabled={disabled}
          checked={localValue ? true : false}
          onChange={_onChange}
        />
      );
    }
    return null;
  }, [type, disabled, name, localValue, _onChange]);

  if (type === "checkbox") {
    return (
      <div className="form-group custom-control">
        <label className="custom-checkbox mb-0">
          {inputField}
          <div className="custom-control-label small weight-700">
            {label || name}
          </div>
        </label>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label className="small">{label || name}</label>
      {inputField}
    </div>
  );
};
