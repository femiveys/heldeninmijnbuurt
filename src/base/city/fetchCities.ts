import { orderBy } from "lodash";
import { isVlaanderen } from "./cityHelpers";
import fs from "fs";

export type TCity = {
  postal: number;
  name: string;
  province: string;
};

export const fetchCities = (
  province?:
    | "Vlaanderen"
    | "West-Vlaanderen"
    | "Oost-Vlaanderen"
    | "Limburg"
    | "Antwerpen"
    | "Vlaams-Brabant"
    | "Henegouwen"
    | "Namen"
    | "Luik"
    | "Waals-Brabant"
) => {
  return new Promise<{ name: string; postal: number; province: string }[]>(
    (resolve, reject) => {
      fs.readFile("./base/city/cities.json", "utf8", (error, jsonString) => {
        if (error) return reject(error);
        let cities = orderBy(JSON.parse(jsonString), "name", "asc");

        if (province === "Vlaanderen") {
          cities = cities.filter((c) => isVlaanderen(c.postal));
        }

        return resolve(cities);
      });
    }
  );
};
