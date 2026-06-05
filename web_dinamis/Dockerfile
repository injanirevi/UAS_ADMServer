# Stage 1: Builder
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Stage 2: Runner
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy standalone build (includes server.js, node_modules, public, .next/static via postbuild)
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder to correct location for standalone server
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
