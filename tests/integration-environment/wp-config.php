<?php
define('DB_NAME',          'wpti');
define('DB_USER',          'wpti');
define('DB_PASSWORD',      'wpti');
define('DB_HOST',          'db');
define('DB_CHARSET',       'utf8');
define('DB_COLLATE',       '');
define('WPLANG',           '');
define('FS_METHOD',        'direct');
define('WP_MEMORY_LIMIT',  '64M');

define('AUTH_KEY',         '#tca;V8]yS$CD*CS|frVh_mwbh/,bMDtM6;;JI2/ko|hw;)||2Zo`GAhl$nX)-Jv');
define('SECURE_AUTH_KEY',  'g.Uvx(}@Hq%?Ov9|JP3*V1gI+8**-ng=8-6$3.1@x_`?NPDE|R/YrqX{eQeky.v2');
define('LOGGED_IN_KEY',    'N+pe~pVdb]48,GoT8M.V#(6&zQpl|J 0C0`:RLT$|bT:p[/fQ?9pI9g2*cog6JCo');
define('NONCE_KEY',        'w$V7]QmXOR`PfFfnNWNV4ZNgFMC*;:qH9Ar+x@2J~Vn9.vT>,B#Sh6rm7DY!<[|I');
define('AUTH_SALT',        'Sj5udb>uE5kux+d.C1bE9*u& 6.U3>yhMX#,|{h8!(lv+Uu2:4n19qG5&O j6fzX');
define('SECURE_AUTH_SALT', '6Y#]P*tWNe;C+jr^`XGf]/pLlqa}|daoS1QbtHBx=@v%j*6~#:XY<,ES/j*XHWk^');
define('LOGGED_IN_SALT',   'LItgu<[qx4/-GXt0WK=E*Hq|g0w&*Vj-Y>U6@<cb|~t~pEXXrahwsNC=TY-ns,Id');
define('NONCE_SALT',       '%w5[454qdnpFZNV&-)%i[/YR[0v4enFp69bI[Xr1:]qMYV|a8N51]7y-VU>[kRx$');

$table_prefix = 'wp_';

if ($table_prefix && !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

defined('JETPACK_DEV_DEBUG') or define('JETPACK_DEV_DEBUG', true);

define('WP_ALLOW_MULTISITE', true);

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
/* @var $result mysqli_result */
$result = $mysqli->query('SHOW TABLE STATUS LIKE "wp_site"');
if ($result && $result->num_rows) {
    define('MULTISITE', true);
    define('SUBDOMAIN_INSTALL', true);
    define('DOMAIN_CURRENT_SITE', 'wpti.dev');
    define('PATH_CURRENT_SITE', '/');
    define('SITE_ID_CURRENT_SITE', 1);
    define('BLOG_ID_CURRENT_SITE', 1);
    $result->free();
}
$mysqli->close();

require_once(ABSPATH . 'wp-settings.php');

/**
 * Disable wp_admin_canonical_url
 * @since 4.2.0
 */
add_filter('removable_query_args', '_wpt_test_removable_query_args');
function _wpt_test_removable_query_args() {
    return array();
}

/**
 * Completely disable all types of automatic updates
 * @since 3.7
 */
define('AUTOMATIC_UPDATER_DISABLED', true);
