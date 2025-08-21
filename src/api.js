import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "https://fakestoreapi.com";

const api = axios.create({ 
  baseURL: apiUrl,
  timeout: 10000
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
