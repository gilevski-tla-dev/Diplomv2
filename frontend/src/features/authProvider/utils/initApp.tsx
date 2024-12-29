import { setErrorMessage, setAuthStatus } from "@/app/store/authSlice";
import { checkUser } from "../api/users";
import { Dispatch } from "redux";

// Определяем тип для ответа от `checkUser`
interface CheckUserResponse {
  userId: string;
  username: string;
  isAuthenticated: boolean;
}

// Получаем initData и отправляем запрос
export const initializeApp = async (dispatch: Dispatch): Promise<void> => {
  const tg = window.Telegram?.WebApp;

  if (!tg) {
    const errorMessage = "Telegram WebApp SDK не доступен";
    console.error(errorMessage);
    dispatch(setErrorMessage(errorMessage));
    return;
  }

  tg.ready();
  const initData = tg.initData;

  if (!initData) {
    const errorMessage = "Ошибка: initData отсутствует";
    console.error(errorMessage);
    dispatch(setErrorMessage(errorMessage));
    return;
  }

  try {
    // Указываем тип возвращаемого значения для `checkUser`
    const response: CheckUserResponse = await checkUser(initData);
    dispatch(setAuthStatus(response.isAuthenticated));
  } catch (error) {
    console.error("Ошибка при проверке пользователя:", error);

    const errorMessage =
      (error as { response?: { data?: { error?: string } } })?.response?.data
        ?.error || "Не удалось выполнить запрос";

    dispatch(setAuthStatus(false));
    dispatch(setErrorMessage(errorMessage));
  }
};
