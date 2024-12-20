export interface User {
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

// Функция для получения данных пользователя из Telegram WebApp SDK
export const getUserData = (): User | null => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready(); // Инициализация SDK
    const initData = tg.initDataUnsafe;

    return initData?.user || null;
  } else {
    console.error("Telegram WebApp SDK не доступен");
    return null;
  }
};
