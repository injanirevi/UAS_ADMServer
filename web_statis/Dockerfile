# Build stage (optional untuk gzip optimization)
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build 2>/dev/null || true

# Production stage - Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY . /usr/share/nginx/html/

# Remove any build artifacts if they exist
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf 2>/dev/null || true

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
