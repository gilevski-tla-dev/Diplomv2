import axios from "axios";
const baseURL = "https://7566-159-203-166-119.ngrok-free.app/api";

// const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL не указан в .env");
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
