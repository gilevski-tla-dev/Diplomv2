# Используем Node.js 18 как базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /backend

# Копируем только package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем весь исходный код
COPY . .

# Собираем приложение
RUN yarn build

# Указываем порт для работы приложения
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start:prod"]
