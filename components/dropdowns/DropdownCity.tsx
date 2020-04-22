import React, { useEffect } from "react";
import { useFetch } from "../../base/api/useFetch";
import { TCity } from "../../base/city/fetchCities";

type TProps = {
  value: number;
  onChange: (value: number | string) => void;
};

export const DropdownCity = ({ value, onChange }: TProps) => {
  const { data: cities, isFetching, refresh: refreshCities } = useFetch<
    TCity[]
  >("cities");

  useEffect(() => {
    refreshCities();
  }, []);

  return (
    <>
      <div className="custom-select custom-select-lg">
        <select
          placeholder="Group"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          {cities?.map((city, ind) => (
            <option key={`${city.postal}-${ind}`} value={city.postal}>
              {city.name} ({city.postal})
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
