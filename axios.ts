import axios from "axios";
import { store } from "./store";

export const axiosInstance = axios.create();

export const generateAxiosInstance = () => {
  return axios.create({
    headers: {
      Authentication: (store.get() as any)?.idToken,
    },
  });
};
