import { AxiosInstance } from "axios";
import { apiCall } from "../../axios";
import { useState, useCallback, useMemo } from "react";

export const useFetch = <T>(
  url: string,
  defaultValue?: T,
  axiosInstance?: AxiosInstance
) => {
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState<T>(defaultValue);

  const refresh = useCallback(async () => {
    if (!url) return;
    try {
      setFetching(true);
      if (axiosInstance) {
        setData(await axiosInstance.get(url).then((resp) => resp.data));
      } else {
        setData(await apiCall("GET", url));
      }
      setFetching(false);
    } catch (error) {
      setError(error);
      setFetching(false);
    }
  }, [url]);

  return useMemo(() => {
    return { isFetching, data, error, refresh };
  }, [isFetching, data, error, refresh]);
};
