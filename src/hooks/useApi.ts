import { useState, useCallback } from "react";
import { AxiosInstance } from "axios";
import { apiCall, TApiMethod } from "../axios";

export const useApi = <T>(
  method: TApiMethod,
  url: string,
  defaultValue?: T,
  axiosInstance?: AxiosInstance
) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setResponse] = useState<T>(defaultValue);

  const callApi = useCallback(
    async (body?: object) => {
      if (!url) return;
      try {
        setLoading(true);
        if (axiosInstance) {
          setResponse(
            await axiosInstance
              .request({ method, url, data: body })
              .then((resp) => resp.data)
          );
        } else {
          setResponse(await apiCall(method, url, body));
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [url, axiosInstance, setResponse, method, data, setLoading, setError]
  );

  // return useMemo(() => {
  return { isLoading, data, error, callApi };
  // }, [isLoading, data, error, callApi]);
};
