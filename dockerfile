# Etapa 1: Construcción de assets con Node.js
FROM node:18-alpine as node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY resources/ resources/
COPY vite.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

RUN npm run build

# Etapa 2: PHP con Laravel
FROM php:8.2-fpm-alpine

# Dependencias del sistema
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
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

# Extensiones de PHP necesarias
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath intl gd

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio de la app
WORKDIR /var/www

# Copiar proyecto completo
COPY . .

# Copiar los assets compilados desde la etapa Node
COPY --from=node /app/public/build public/build

# Instalar dependencias Laravel (sin dev)
RUN composer install --no-dev --optimize-autoloader

# Generar la key si no existe
RUN php artisan key:generate || true

# Asegurar permisos correctos
RUN chown -R www-data:www-data /var/www

# Puerto expuesto para Railway / Render
EXPOSE 8000

# Comando de arranque: migrar y servir
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
