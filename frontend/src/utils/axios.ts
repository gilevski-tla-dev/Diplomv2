import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://02b6-159-203-166-119.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
