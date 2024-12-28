// telegram.d.ts

import { User } from "./user";

interface TelegramWebApp {
  ready(): void;
  initDataUnsafe: {
    user?: User;
  };
  initData: string;
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram: TelegramWebApp; // Расширяем тип Window для Telegram WebApp
  }
}

export {};
