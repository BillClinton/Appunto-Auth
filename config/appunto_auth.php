<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

$config['site_name'] = 'Appunto Auth';
$config['admin_name'] = 'Administrator';
$config['admin_email'] = 'admin@website.com';

/**
 * Appunto Auth version
 */
$config['appunto_auth_version'] = '0.0.3';

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
 * Ext JS URL
 *
 * This is the URL of or the path to the Ext JS Library.  By default, we are loading 
 * it from the Sencha CDN, but you can choose a different CDN or download Ext JS and 
 * put it in your application's path. Make sure you include the trailing slash.
 */
//$config['extjs_url'] = '/my-extjs-location/';
//$config['extjs_url'] = 'http://extjs.cachefly.net/ext-4.0.7-gpl/';
$config['extjs_url'] = 'http://cdn.sencha.io/ext-4.0.7-gpl/';

/**
 * Path cache
 *
 * By default, the application paths will be loaded from the db into an array on every request.
 * You can cache the paths for better performance, but note that changes made to paths and their 
 * permissions will not take effect until the cache is refreshed.  
 *
 * The interval of the cache refesh is determined by the value of path_cache_duration, in seconds,
 * If the value of path_cache_duration is set to false, the cache will never refresh. This is
 * not recommended, but if you do try it let me know how it goes.
 */
$config['cache_paths'] = false;
$config['path_cache_duration'] = 3600; //default is 5 minutes, 60*5=3600

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
 * Dev Mode
 *
 * default: false
 *
 * Do not change this from false unless you are working on the interface's source
 * code.  If you do not have the source files in the correct directory the interface
 * will not work at all.  If you do have the source files in the correct location,
 * the interface will render very slowly, expecially if you are loading the ExtJS
 * library from an external address, so do not leave this set to true in production,
 */
$config['appunto_dev_mode'] = false;
