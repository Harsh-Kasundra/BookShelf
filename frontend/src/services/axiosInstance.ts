import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

export default axiosInstance;