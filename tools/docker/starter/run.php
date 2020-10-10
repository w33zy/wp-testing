#!/usr/bin/env php
<?php

namespace Wpt;

use mysqli;

log('Installing vendors');
echo shell_exec('composer install --ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist');

// echo shell_exec('cd db && ../vendor/bin/ruckus.php db:migrate');

log('Creating DB and user');
$mysqli = new mysqli('db', 'root', '123456');

$DB_CHARSET = getenv('DB_CHARSET') ?: 'utf8';

$mysqli->query('DROP DATABASE IF EXISTS wpti');
$mysqli->query("CREATE DATABASE wpti DEFAULT CHARACTER SET '$DB_CHARSET'");
$mysqli->query('GRANT USAGE ON wpti.* TO wpti');
$mysqli->query('DROP USER wpti');
$mysqli->query('CREATE USER wpti IDENTIFIED BY "wpti"');
$mysqli->query('GRANT ALL ON wpti.* TO wpti');


function log($message) {
    $now = date(DATE_ATOM);
    echo "[$now] $message\n";
}
