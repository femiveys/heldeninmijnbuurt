import { AxiosRequestConfig, AxiosInstance } from "axios";
import { apiCall } from "../../axios";
import { useState, useCallback, useMemo, useEffect } from "react";

export const useFetch = <T extends {}>(
  url: string,
  axiosInstance?: AxiosInstance
) => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<T>();

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
    return {
      fetching,
      data,
      error,
      refresh,
    };
  }, [fetching, data, error, refresh]);
};
