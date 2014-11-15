# Appunto-Auth

An authentication library for CodeIgniter with a Sencha Ext JS interface and a simple ACL.

current release 0.1.0

The goal of Appunto-Auth is to provide the CodeIgniter developer with an authentication and user management 
system that takes authentication code out of an application's individual controller classes and functions.

## Features
 - Administrative interface using ExtJS
 - Authentication performed in a hook rather than controller code
 - Simple ACL with roles and permissions
 - Restrict/Allow access using controller/function paths
 - Hashes passwords in database using phpass library
 - Multiple language support

## Installing

### CodeIgniter Setup

Enable CodeIgniter to use the database to store sessions by following the instructions 
in the _Saving Session Data to a Database_ section of the _Session Class_ page in the CodeIgniter
User Guide located at http://codeigniter.com/user_guide/libraries/sessions.html

 - set an __encryption_key__ in CodeIgniter's config/config.php
 - create the ci_sessions database table
 - enable the database option in your config.php by setting __sess_use_database__ to TRUE in CodeIgniter's config.php

video walkthrough of this step here: https://www.youtube.com/watch?v=GlQSNBO2Eg4


### Download Appunto-Auth

The latest version of Appunto-Auth is available at http://www.appunto.net/appunto-auth/download

You can download the most recent working build at https://github.com/BillClinton/Appunto-Auth

The Appunto-Auth download contains 4 folders:
```
   .
   |-application
   |-resources
   |-db
   |-src
```

#### Copy the application and resources folders to your application folder

The application folder contains controllers, models, views, helpers, libraries, and config folders.  
While it is always a good idea to back up your application, the files contained in these folders are in 
appunto-auth subfolders and should not overwrite anything in your existing CodeIgniter folder structure.  

The files in the language folder are not in an appunto-auth subfolder, but unless you already have a file 
named appunto_auth_lang.php in one of your language folders (unlikely), you don't have to worry about any 
language file overwriting

The files in the resources folder contain javascript, css and images needed by the Appunto-Auth admin interface.

Copy the downloaded __applications__ and __resources__ folders into your main Codeigniter folder (the folder that
contains the system and application folder) 

Your CodeIgniter folder should now look like this:
```
   .
   |-application
   |-resources
   |-system
   |-user_guide (if you haven't deleted it yet)
```

### Update Codeigniter configuration files

#### Load the Appunto_auth.php library file in autoload.php
Include a reference to the Appunto_auth library in CodeIgniter's config/autoload.php file.  CodeIgniter will be calling a method in this library in a post_controller_constructor hook, so it will be needed in every controller.  Therefore there is no reason to load it in your individual controllers rather than in the autoload file.  Example:

```
$autoload['libraries'] = array('appunto-auth/appunto_auth');
```

#### Import the Appunt Auth tables
Use the table creation script in the __db__ folder to create the Appunto-Auth tables. You can use the command line: 

```
mysql -u [db username] -p [db name] < db/create_auth_db.sql 
```
Or just paste the contents of this file into PhpMyAdmin.

Your database should already contain the ci_session table.

#### Include Reference to Hook in hooks.php
Appunto Auth authenticates the user in a post_controller_constructor hook. The hook function resides in the Appunto_auth.php 
library file.  A reference to this hook must be included in CodeIgniter's config/hooks.php file using the following format:

```
$hook['post_controller_constructor'] = array(
	'class'    => 'Appunto_auth',
	'function' => 'require_authentication_hook',
	'filename' => 'appunto-auth/Appunto_auth.php',
	'filepath' => 'libraries',
	'params'   => array()
);
```
#### Enable CodeIgniter hooks
Enable CodeIgniter hooks by setting __enable_hooks__ to TRUE in your application's config.php

## Support for multiple languages

The current release of Appunto-Auth includes one additional language: Brazilian Portuguese.  If you translate Appunto-Auth 
to your native language, I would love to include it in future releases.  Please send me the files at code@appunto.net 
or fork the project and add them yourself using these instructions: http://kbroman.org/github_tutorial/pages/fork.html

To try the Portuguese translation, change the value of the $config['language'] setting in the CodeIgniter config/config.php
file from __english__ to __portuguese-br__

### Translating Appunto-Auth

#### Codeigniter language files

The first step in translating Appunto-Auth is to create or find a translation of the CodeIgniter language files.  
When you change the language via the $config['language'] setting in the CodeIgniter config/config.php, CodeIgniter
libraries will expect these files to be there and you will most likely experience PHP errors if they are not there.

There are many translations out there for CodeIgniter's language files and you should be able to find one for your language.
If not, copy the English files from system/language/english into application/language/your-language to prevent PHP errors.  You
can then change the text in these files where necessary.  If you complete a full translation, please post it and share it with 
other CodeIgniter developers. 

#### Appunto-Auth Codeigniter language file

Appunto-Auth's CodeIgniter language files are included in the application/language/[language-name] folders.  To add your own 
translation, create a folder with the name of your language in the application/language/ folder.  Copy the 
appunto_auth_lang.php into your new folder from one of the other language folders and use it as a template.

 __The name of this folder must match the name of the value of the $config['language'] setting in the CodeIgniter config/config.php__


#### Appunto-Auth admin interface language file

The language files used to translate many of the elements of the admin interface are javascript files located 
at resources/appunto-auth/lang/ .  To translate this into your own language, start with the english.js file and rename it to 
your-language.js. 

 __The name of this file must match the name of the CodeIgniter language folder and the value of the $config['language'] 
setting in the CodeIgniter config/config.php__

Change the text values from English to your native language, but be very careful about quotes and commas.  Javascript can
be very finicky and a missed comma or misplaced quote can cause a javascript error that will prevent the application from 
opening at all.  If your admin interface does not load, check your syntax.  Please convert all accented and special characters
to HTML safe entities using a converter like this: http://www.kidquick.com/JoomlaTools/frenchAccents.htm

## Helpers

__appunto_login_box()__

creates a login dialog

__anchor_if_permitted($permission,$uri,$title,$attributes)__

Creates an anchor based on the local URL if user has the appropriate permission.  The permission parameter is case 
sensitive and must match the internal name of a permission you have created in the admin interface for this
function to return a link

This helper uses the anchor() helper function from CodeIgniter's URL Helper so use the guidelines for that function for
the 2nd, 3rd and 4th parameters. 

__appunto_username()__

Returns the user's username, if logged in.

__appunto_logout_link($show_if_logged_out,$attributes)__

Creates a logout link based on the logout path defined in the appunto_auth.php config file, using the logout text specified
in the appunto_auth_lang.php file.

If the first parameter is true, a logout link will be returned even if the user is not logged in.  Defaults to false.

The second parameter can contain a list of attributes you would like added to the link. The attributes can be a simple 
string or an associative array, as defined by the anchor() helper function from CodeIgniter's URL Helper.

__is_logged_in()__

Returns true if the user is logged in, false if the user is not logged in.

## Public Library Functions

While one of the goals of Appunto-Auth is to take authentication code out of the application's controllers,
occasionally situations require some user control within the controller classes, for example if you want your 
default controller to redirect to another controller depending on the user's permissions. 

These functions can be called using the following syntax:
```
$this->appunto_auth->function_name()
```

__logged_in()__

Returns true if the user is logged in, false if the user is not logged in.

__get_username()__

Returns the user's username if the user is logged in, false if the user is not logged in.

__get_user_id()__

Returns the user's id if the user is logged in, false if the user is not logged in.

__userHasPermission($permission)__

The $permission parameter is case sensitive and must match the internal name of a permission you have created in the admin interface.

Returns true if the user has the specified permission, false if the user is not logged in or does not
have the specified permission.


## Additional Notes

### A note on removing index.php 

You may remove the index.php from your URLs as described in the CodeIgniter user guide, but make sure you alter the rewrite rule to exclude the resources folder so the css and javascript files are not served by the index.php.  If you are using the example .htaccess from the user guide:
```
RewriteEngine on
RewriteCond $1 !^(index\.php|images|robots\.txt)
RewriteRule ^(.*)$ /index.php/$1 [L]
```
add resources to the RewriteCond line like this:
``` 
RewriteEngine on
RewriteCond $1 !^(index\.php|images|robots\.txt|resources)
RewriteRule ^(.*)$ /index.php/$1 [L]
```
If your application is not being served from the root of your domain, be sure to alter the third line with the correct path:
``` 
RewriteRule ^(.*)$ /myapplication/index.php/$1 [L]
```

### A note on _remap (Remapping Function Calls)

CodeIgniter allows the developer to remap function calls as detailed here: https://ellislab.com/codeigniter/user-guide/general/controllers.html#remapping

If a controller does contain a _remap function, AppuntoAuth's verification procedure will verify the user if the user has 
necessary permissions to access a function in that controller that matches the user's request path (the normal procedure), 
or if the user has the necessary permissions to access the _remap function.

As noted in the CodeIgniter user guide: "If your controller contains a function named _remap(), it will always get called 
regardless of what your URI contains. It overrides the normal behavior in which the URI determines which function is called, 
allowing you to define your own function routing rules." Therefore AppuntoAuth assumes any call to a controller with a _remap
function could be a call to the _remap function and verifies the user's permissions for the _remap function. 

If additional access levels are desired in a controller with a _remap function, the developer must add them to the controller code. 

## Limitations

### MySQL only

The current release has only been tested on MySQL.  I hope to add support for other databases in future releases.

### Controllers with the same name

CodeIgniter allows you to have controllers with the same name as long as they are located in different folders.  This is not 
currently supported by Appunto-Auth and all controller classes in your application must have unique names.



