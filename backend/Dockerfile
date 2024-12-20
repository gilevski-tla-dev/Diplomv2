# Этап сборки (build stage)
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем только package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости, используя флаг frozen-lockfile для точности версии
RUN yarn install --frozen-lockfile

# Копируем весь исходный код
COPY . .

# Собираем приложение
RUN yarn build

# Этап для продакшн-образа (production stage)
FROM node:20-slim AS production

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем только необходимые файлы из предыдущего этапа (собранный проект)
COPY --from=build /frontend/dist /frontend/dist
COPY --from=build /frontend/package.json /frontend/yarn.lock /frontend/

# Устанавливаем только продакшн-зависимости
RUN yarn install --production --frozen-lockfile

# Открываем порт, на котором будет работать приложение
EXPOSE 5173

# Запускаем приложение
CMD ["yarn", "run", "start:prod"]
