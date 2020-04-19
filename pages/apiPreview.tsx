import React from "react";
import { apiCall } from "../axios";

export default () => {
  const postalCodes = async () => {
    const result = await apiCall("GET", "postalCodes");
    console.log(result);
  };

  const streets = async (postalCode: number) => {
    const result = await apiCall("GET", `streets/${postalCode}`);
    console.log(result);
  };

  postalCodes();
  streets(2000);

  return <div>Check the console</div>;
};
