<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$config['site_name'] = 'My Application';
$config['admin_name'] = 'Administrator';
$config['admin_email'] = 'admin@website.com';

/**
 * Appunto Auth version
 */
$config['appunto_auth_version'] = '0.0.1';

/**
 * Behavior for private paths without permissions.
 *
 * if true, paths marked as private that don't have a permission set will be visible 
 * to any logged in user.
 * 
 * if false, paths marked as private that don't have a permission set will be essentially
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
 * a prefix that will be added to all table names.
 */
$config['db_table_prefix'] = '';
