import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { User } from "../model/user";

// Хук для отправки данных пользователя
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: User) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("Данные пользователя успешно отправлены");
    },
    onError: (error: Error) => {
      console.error("Ошибка при отправке данных:", error);
    },
  });
};
