# Etapa 1: Node para compilar assets
FROM node:18-alpine as node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY resources/ resources/
COPY vite.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

RUN npm run build

# Etapa 2: PHP con Composer y servidor
FROM php:8.2-fpm-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    bash \
    curl \
    libpng \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    icu-dev \
    zlib-dev \
    libxml2-dev \
    mariadb-client \
    mariadb-connector-c-dev \
    autoconf \
    g++ \
    make \
    nginx \
    supervisor

# Instalar extensiones de PHP necesarias
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath intl gd

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Crear directorio del proyecto
WORKDIR /var/www

# Copiar código fuente
COPY . .

# Copiar los assets compilados desde la etapa Node
COPY --from=node /app/public/build public/build

# Instalar dependencias de PHP
RUN composer install --no-dev --optimize-autoloader

# Permisos
RUN chown -R www-data:www-data /var/www

# Variables de entorno (puedes sobreescribirlas en Render)
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_KEY=base64:dummy

# Puerto para Render
EXPOSE 8000

# Comando de arranque
CMD php artisan serve --host=0.0.0.0 --port=8000
