# =========================
# Stage 1: build frontend
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# =========================
# Stage 2: export dist
# =========================
FROM node:20-alpine AS production

WORKDIR /app

# копируем результат сборки
COPY --from=builder /app/dist ./dist

# контейнер ничего не запускает
# CMD ["sh"]