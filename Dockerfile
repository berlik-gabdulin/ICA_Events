FROM node:16

WORKDIR /app

# Копируйте файлы проекта и установите зависимости
COPY package*.json ./
RUN npm install
COPY . .

# Стартовый команды
CMD [ "npm", "run", "dev" ]

# # Создание продакшн-билда
# RUN npm run build

# # Запуск продакшн-сервера
# CMD [ "npm", "start" ]
