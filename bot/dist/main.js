import { Telegraf } from "telegraf";
// Создайте экземпляр бота с токеном
const bot = new Telegraf("5821534037:AAGGxevje9-Qlf4PSh6TeIjPWFiEWzrrXC0");
// Обработчик команды /start
bot.command("start", (ctx) => {
    ctx.reply("Привет! Нажми на кнопку ниже, чтобы открыть Web App:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Открыть Web App", // Текст на кнопке
                        web_app: {
                            url: "https://1575-79-137-197-63.ngrok-free.app/profile",
                        }, // URL вашего веб-приложения
                    },
                ],
            ],
        },
    });
});
// Запуск бота
bot.launch();
console.log("Бот запущен!");
