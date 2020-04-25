import axios from "axios";

export const fetchIP = async () => {
  const data = await axios
    .get("http://ip-api.com/json")
    .then((resp) => resp.data);
  const postalCode = data?.zip;
  const region = data?.regionName;

  return { postalCode, region };
};
