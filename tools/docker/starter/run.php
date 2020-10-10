#!/usr/bin/env php
<?php

echo shell_exec('composer install --ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist');

// echo shell_exec('cd db && ../vendor/bin/ruckus.php db:migrate');
