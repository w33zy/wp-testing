#!/usr/bin/env php
<?php

namespace Wpt;

use mysqli;

define('ROOT', realpath(__DIR__.'/../../../'));

$DB_CHARSET = getenv('DB_CHARSET') ?: 'utf8';
$WP_VERSION = getenv('WP_VERSION') ?: 'latest';


log('Installing vendors');
echo shell_exec('composer install --ansi --no-interaction --no-progress --optimize-autoloader --prefer-dist');

// echo shell_exec('cd db && ../vendor/bin/ruckus.php db:migrate');

log('Creating DB and user');
$mysqli = new mysqli();
$tries = 0;
while ($tries++ < 20) {
    if (@!$mysqli->real_connect('db', 'root', '123456')) {
        log('Connect error: '.$mysqli->connect_error);
        sleep(1);
    }
}

if ($mysqli->connect_error) {
    log('Still can not connect...');
    exit(2);
}

$mysqli->query('DROP DATABASE IF EXISTS wpti');
$mysqli->query("CREATE DATABASE wpti DEFAULT CHARACTER SET '$DB_CHARSET'");
$mysqli->query('GRANT USAGE ON wpti.* TO wpti');
$mysqli->query('DROP USER wpti');
$mysqli->query('CREATE USER wpti IDENTIFIED BY "wpti"');
$mysqli->query('GRANT ALL ON wpti.* TO wpti');

log('Installing WordPress');
$WP_LINK="https://wordpress.org/wordpress-$WP_VERSION.tar.gz";
$WP_FILE="cache/wordpress-$WP_VERSION.tar.gz";

echo shell_exec('rm -rf wordpress');

log('.. downloading');

echo shell_exec("curl -s -z $WP_FILE -o $WP_FILE $WP_LINK");
echo shell_exec("tar -xzf $WP_FILE");

$config = file_get_contents(ROOT.'/tests/integration-environment/wp-config.php');
$config = str_replace('utf8', $DB_CHARSET, $config);
file_put_contents(ROOT.'/wordpress/wp-config.php', $config);

function log($message) {
    $now = date(DATE_ATOM);
    echo "[$now] $message\n";
}
