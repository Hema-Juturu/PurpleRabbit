import axios from "axios";

const api = axios.create({
  // ✅ your backend base URL
  baseURL: "https://purplerabbit.onrender.com/api",
  //  baseURL: "http://localhost:7000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
