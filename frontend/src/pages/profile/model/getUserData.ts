import { User } from "./user";

export const getUserData = (): User | null => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready(); // Инициализация SDK
    const initData = tg.initDataUnsafe;

    if (initData) {
      return initData.user || null;
    }
  }

  console.error("Telegram WebApp SDK не доступен");
  return null;
};
