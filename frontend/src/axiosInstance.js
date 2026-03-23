import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://purplerabbit.onrender.com/api");

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const tokenInvalidHeader = error?.response?.headers?.["x-token-invalid"];
    const shouldLogout = error?.response?.data?.shouldLogout === true;
    const tokenInvalidBody = error?.response?.data?.tokenInvalid;

    const isExpired =
      status === 401 &&
      (shouldLogout || tokenInvalidHeader === "expired" || tokenInvalidBody === "expired");

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
