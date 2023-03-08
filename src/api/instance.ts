import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 20000
});

export default axiosInstance;
