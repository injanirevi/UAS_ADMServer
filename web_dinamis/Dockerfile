#1. builder

FROM node:24-alpine AS builder
#set directory
WORKDIR /app

#copy package.json dan package-lock.json
COPY package*.json .

#install depedencies
RUN npm install

#copy source code
COPY . . 

#build next js
RUN npm run build

#2. RUNNER

FROM node:24-alpine AS runner

#set directory
WORKDIR /app

#environment variables for Next.js
ENV NODE_ENV=production

#copy build file from builder
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./.next/public

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]