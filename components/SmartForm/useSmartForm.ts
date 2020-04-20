import { useState, useRef, useEffect, useMemo, useCallback } from "react";

export const useSmartForm = (defaultValues?: any) => {
  const valuesRef = useRef<any>({});
  const [values, setValues] = useState<any>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // TODO: do a isEqual check
    valuesRef.current = defaultValues || {};
    setValues(valuesRef.current);
    setDirty(false);
  }, [defaultValues]);

  const setValue = useCallback(
    (field: string, value: any) => {
      if (valuesRef.current?.[field] !== value) {
        valuesRef.current = { ...valuesRef.current, [field]: value };
        setValues(valuesRef.current);
        setDirty(true);
      }
    },
    [setValues]
  );

  const collectValues = useCallback(() => {
    return valuesRef.current;
  }, []);

  return useMemo(() => {
    return { values, setValue, collectValues, dirty };
  }, [values, setValue, collectValues, dirty]);
};
