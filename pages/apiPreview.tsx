import React from "react";
import { generateAxiosInstance } from "../axios";

export default () => {
  const postalCodes = async () => {
    const result = await generateAxiosInstance().get<number[]>(
      "/api/postalCodes"
    );
    console.log(result);
  };

  const streets = async (postalCode: number) => {
    const result = await generateAxiosInstance().get<number[]>(
      `/api/streets/${postalCode}`
    );
    console.log(result);
  };

  postalCodes();
  streets(2000);

  return <div>Check the console</div>;
};
