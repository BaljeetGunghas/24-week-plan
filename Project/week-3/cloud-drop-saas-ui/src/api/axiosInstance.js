import axios from "axios";
import config from "../../config";
import { store } from "../redux/store";
import { updateISTokenExpiredReducer } from "../redux/slice/authSlice";
import { getToken } from "../utils/constant";

const { BASE_URL } = config;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");

      store.dispatch(updateISTokenExpiredReducer(true));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
