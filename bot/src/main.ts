import { Telegraf } from "telegraf";
import dotenv from "dotenv";

// Загрузка переменных окружения из .env файла
dotenv.config({ path: "../.env" });

// Получение переменных из окружения
const webAppUrl = process.env.WEB_APP_URL;
const botToken = process.env.TELEGRAM_BOT_TOKEN;

// Проверка наличия обязательных переменных
if (!botToken) {
  throw new Error("TELEGRAM_BOT_TOKEN не указан в .env");
}
if (!webAppUrl) {
  throw new Error("WEB_APP_URL не указан в .env");
}

// Создание экземпляра бота
const bot = new Telegraf(botToken);

// Обработчик команды /start
bot.command("start", (ctx) => {
  ctx.reply("Привет! Нажми на кнопку ниже, чтобы открыть Web App:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть Web App",
            web_app: { url: webAppUrl },
          },
        ],
      ],
    },
  });
});

// Запуск бота
bot.launch();
console.log("Бот запущен! URL Web App:", webAppUrl);
