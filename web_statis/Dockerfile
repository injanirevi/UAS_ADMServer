# Production stage - Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy semua file statis
COPY . /usr/share/nginx/html/

# --- TAMBAHKAN BARIS INI UNTUK MEMPERBAIKI PERMISSION ---
# Memberikan izin baca (read) ke semua user untuk folder html
RUN chmod -R 755 /usr/share/nginx/html && chmod -R 644 /usr/share/nginx/html/*
# --------------------------------------------------------

# Remove any build artifacts if they exist
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf 2>/dev/null || true

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]