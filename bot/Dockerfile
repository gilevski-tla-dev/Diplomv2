# Используем Node.js 18 как базовый образ
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /bot

# Копируем только package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем все зависимости (включая devDependencies)
RUN yarn install --frozen-lockfile

# Копируем весь исходный код
COPY . .

# Проверяем наличие `tsc`
RUN npx tsc --version

# Собираем приложение
RUN yarn build

# Указываем порт для работы приложения
EXPOSE 3001

# Запускаем приложение
CMD ["yarn", "start:prod"]
