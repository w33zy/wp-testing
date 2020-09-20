#!/usr/bin/env sh

apk add gnu-libiconv --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/ --allow-untrusted

apk add --no-cache git

export LD_PRELOAD="/usr/lib/preloadable_libiconv.so php"

curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

composer install --no-ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist
