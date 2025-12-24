import axios, { type AxiosInstance, AxiosError } from "axios";
import { store } from "../store";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor → attach JWT
axiosClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// Response interceptor → handle 401 / token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    } else {
      toast.error(error.message || "Network error");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
