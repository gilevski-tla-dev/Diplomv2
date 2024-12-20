// telegram.d.ts

interface TelegramWebApp {
  ready(): void;
  initDataUnsafe: {
    user?: {
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
      language_code: string;
    };
  };
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram: TelegramWebApp; // Расширяем тип Window
  }
}

export {};
