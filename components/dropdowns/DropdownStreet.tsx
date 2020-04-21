import React, { useEffect } from "react";
import { useFetch } from "../../base/api/useFetch";
import { TStreet } from "../../types";

type TProps = {
  postalCode: string | number;
  value?: string | number;
  onChange: (value: number | string) => void;
};

export const DropdownStreet = ({ postalCode, value, onChange }: TProps) => {
  console.log("DropdownStreet", { postalCode });
  const { data: streets, fetching, refresh: refreshStreets } = useFetch<
    TStreet[]
  >(`streets?postalCode=${postalCode}`);

  useEffect(() => {
    if (postalCode) refreshStreets();
  }, [postalCode]);

  return (
    <>
      <div className="custom-select custom-select-lg">
        <select
          key={postalCode}
          placeholder="Group"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option key="none" value="">
            Selecteer
          </option>
          {streets?.map((street, ind) => (
            <option key={street.id} value={street.id}>
              {street.streetDescNl ||
                street.streetDescFr ||
                street.streetDescDe}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
