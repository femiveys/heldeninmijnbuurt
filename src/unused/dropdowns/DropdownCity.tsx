import React, { useEffect } from "react";
import { useApi } from "../../base/api/useApi";
import { TCity } from "../../base/city/fetchCities";

type TProps = {
  value: number;
  onChange: (value: number | string) => void;
};

export const DropdownCity = ({ value, onChange }: TProps) => {
  const { data: cities, isLoading, callApi: fetchCities } = useApi<TCity[]>(
    "GET",
    "cities"
  );

  useEffect(() => {
    fetchCities();
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
