import axiosInstance from "@/utils/axios";
import { User } from "../model/user";

export const createUser = (userData: User): Promise<User> => {
  return axiosInstance
    .post("/users", userData) // используем axiosInstance для запроса
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
