import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://4de1-159-203-166-119.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
