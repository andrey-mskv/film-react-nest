# =========================
# Stage 1: build backend
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# =========================
# Stage 2: production
# =========================
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# копируем результат сборки
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "dist/main.js"]