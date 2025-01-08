import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" }); // Указываем путь к .env

const webAppUrl = "https://d5ec-159-203-166-119.ngrok-free.app";
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
