import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные из .env

const webAppUrl = "https://30e7-79-137-197-63.ngrok-free.app";
const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new Error("BOT_TOKEN не указан в .env");
}

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
