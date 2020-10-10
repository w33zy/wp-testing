#!/usr/bin/env sh

composer install --no-ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist

# (cd db && ../vendor/bin/ruckus.php db:migrate)
