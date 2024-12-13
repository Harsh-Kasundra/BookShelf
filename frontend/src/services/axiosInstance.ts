import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 60000,
  headers: { "content-type": "application/json" },
});
