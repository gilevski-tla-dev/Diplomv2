import { setErrorMessage, setAuthStatus } from "@/app/store/authSlice";
import { checkUser } from "../api/users";
import { Dispatch } from "redux";

interface CheckUserResponse {
  success: boolean;
  message: string;
  username: string;
  tgId: number;
}

import { setLoading } from "@/app/store/authSlice";

export const initializeApp = async (dispatch: Dispatch): Promise<void> => {
  const tg = window.Telegram?.WebApp;

  // Начало загрузки
  dispatch(setLoading(true));

  if (!tg) {
    const errorMessage = "Telegram WebApp SDK не доступен";
    console.error(errorMessage);
    dispatch(setErrorMessage(errorMessage));
    dispatch(setLoading(false)); // Завершаем загрузку
    return;
  }

  tg.ready();
  const initData = tg.initData;

  if (!initData) {
    const errorMessage = "Ошибка: initData отсутствует";
    console.error(errorMessage);
    dispatch(setErrorMessage(errorMessage));
    dispatch(setLoading(false)); // Завершаем загрузку
    return;
  }

  try {
    const response: CheckUserResponse = await checkUser(initData);
    console.log("Ответ от checkUser:", response);

    if (response.success) {
      dispatch(setAuthStatus(true));
    } else {
      dispatch(setAuthStatus(false));
    }
  } catch (error) {
    console.error("Ошибка при проверке пользователя:", error);

    const errorMessage =
      (error as { response?: { data?: { error?: string } } })?.response?.data
        ?.error || "Не удалось выполнить запрос";

    dispatch(setAuthStatus(false));
    dispatch(setErrorMessage(errorMessage));
  } finally {
    // Завершаем загрузку
    dispatch(setLoading(false));
  }
};
