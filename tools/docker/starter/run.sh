#!/usr/bin/env sh

curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

composer install --no-ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist
