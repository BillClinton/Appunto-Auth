<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$config['site_name'] = 'Appunto Auth';
$config['admin_name'] = 'Administrator';
$config['admin_email'] = 'admin@website.com';


/**
 * Appunto Auth version
 */
$config['appunto_auth_version'] = '0.1.3';

/**
 * Admin interface theme. There are two themes:
 * appunto-auth : the default theme
 * ext-theme-gray : a neutral gray theme
 */
$config['appunto_auth_theme'] = 'appunto-auth';
//$config['appunto_auth_theme'] = 'ext-theme-gray';

/**
 * Behavior for private paths without permissions.
 *
 * default: false
 *
 * If true, paths marked as private that don't have a permission set will be visible 
 * to any logged in user.  This may be useful if you have numerous URIs that should
 * be accessile to all logged in users, and you don't want to add a permission to each
 * one.
 * 
 * If false, paths marked as private that don't have a permission set will be essentially
 * inaccessible until the admin assigns a permission to that path.   
 */
$config['allow_private_without_permission'] = false;

/**
 * PHPPass Settings
 *
 * Quote from http://sunnyis.me/blog/secure-passwords/
 * 'The default arguments specified should be fine for up-to-date installations of PHP. 
 *  The first argument specifies the "base-2 logarithm of the iteration count used for 
 *  password stretching" and the second argument specifies the use of portable hashes.'
 */
$config['hash_logarithm'] = 8;
$config['hash_use_portable'] = false;

/**
 * Database table prefix
 *
 * A prefix that will be added to all table names. Leave this blank if your database 
 * doesn't add a prefix to your tables.
 */
$config['db_table_prefix'] = '';

/**
 * Password validation regular expression
 *
 * If you change this, be sure to change the appropriate language file to update the error message
 *
 * Default: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+-=]{6,16}$
 * 
 * Password must be at least 6 characters, no more than 16 characters, and must include at 
 * least one upper case letter, one lower case letter, and one numeric digit.
 *
 * Note the version that will appear as a javascript string has the backslash escaped.
 */
$config['password_regex_php'] = "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+-=]{6,16}$/";
$config['password_regex_js']  = "^(?=.*\\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+-=]{6,16}$";

/**
 * The login and logout URLs.  You can change these if you create route(s) in config/routes.php 
 * eg. $route['login'] = 'appunto-auth/user/login';
 */
$config['login_url'] = 'appunto-auth/user/login';
$config['logout_url'] = 'appunto-auth/user/logout';

/**
 * Keep alive for the admin interface so sessions do not time out, in seconds.  Set to 0 if you want no keep-alive 
 * default = 5*60 (5 minutes)  
 */
$config['admin_keepalive'] = 5*60;

/**
 * Date/time format
 *
 */
$config['datetime_format'] = 'm/d/Y H:i:s';
