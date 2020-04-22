import { useFetch } from "../base/api/useFetch";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { TStreet } from "../types";
import { Spinner } from "./Spinner";
import { apiCall } from "../axios";
import { message } from "antd";
import { store } from "../store";

const getStreetInUserLanguage = (street: TStreet, language = "nl") => {
  switch (language) {
    case "fr":
      return street.streetDescFr || street.streetDescNl || street.streetDescDe;
    case "de":
      return street.streetDescDe || street.streetDescFr || street.streetDescNl;
    default:
      return street.streetDescNl || street.streetDescFr || street.streetDescDe;
  }
};

export const EnterStreet = () => {
  const [postalCode, setPostalCode] = useState<number>();
  const [streetId, setStreetId] = useState<number>();
  const {
    data: postalCodes,
    isFetching: isFetchingPostalCodes,
    refresh: refreshCities,
  } = useFetch<number[]>("postalCodes", []);
  const {
    data: streets,
    isFetching: isFetchingStreets,
    refresh: refreshStreets,
  } = useFetch<TStreet[]>(`streets/${postalCode}`, []);

  // TODO postalCodes could be taken from a static JSON or localstorage
  useEffect(() => {
    refreshCities();
  }, []);

  useEffect(() => {
    refreshStreets();
  }, [postalCode]);

  const onPostalCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const postalCode = Number(e.target.value);
    if (postalCode) setPostalCode(postalCode);
  };

  const onStreetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const streetId = Number(e.target.value);
    if (streetId) setStreetId(streetId);
  };

  const onSubmit = async () => {
    if (streetId) {
      try {
        // Register
        const me = await apiCall("POST", "/me", { streetId: streetId });
        message.success("Profiel aangemaakt!");
        store.dispatch("user/setUser", me);
      } catch (error) {
        message.error("Er ging iets fout. Probeer ns opnieuw");
      }
    }
  };

  const onPostalCodeChangeCb = useCallback(onPostalCodeChange, []);
  const onStreetChangeCb = useCallback(onStreetChange, []);

  return (
    <div id="choose-street">
      <form onSubmit={() => console.log(",dklfjdsklfjs")}>
        <div className="form-group">
          <label>Postnummer</label>
          <select onChange={onPostalCodeChangeCb}>
            {isFetchingPostalCodes ? (
              <option disabled>Fetching</option>
            ) : (
              <>
                <option>Kies je postnummer</option>
                {postalCodes.map((postalCode) => (
                  <option key={postalCode} value={postalCode}>
                    {postalCode}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        {postalCode ? (
          <div className="form-group">
            <label>Straat</label>
            {isFetchingStreets ? (
              <Spinner color="blue" />
            ) : (
              <select onChange={onStreetChangeCb}>
                <option>Kies je straat</option>
                {streets.map((street) => (
                  <option key={street.id} value={street.id}>
                    {getStreetInUserLanguage(street)}
                  </option>
                ))}
              </select>
            )}
          </div>
        ) : null}
        {streetId ? (
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Ga door
          </button>
        ) : null}
      </form>
    </div>
  );
};
