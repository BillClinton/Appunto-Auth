# Appunto-Auth

An authentication library for CodeIgniter with a Sencha Ext JS interface and a simple ACL.

public release November 10th, 2014

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


### Additional Notes

#### A note on removing index.php 

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
#### A note on _remap (Remapping Function Calls)

CodeIgniter allows the developer to remap function calls as detailed here: https://ellislab.com/codeigniter/user-guide/general/controllers.html#remapping

If a controller does contain a _remap function, AppuntoAuth's verification procedure will verify the user if the user has 
necessary permissions to access a function in that controller that matches the user's request path (the normal procedure), 
or if the user has the necessary permissions to access the _remap function.

As noted in the CodeIgniter user guide: "If your controller contains a function named _remap(), it will always get called 
regardless of what your URI contains. It overrides the normal behavior in which the URI determines which function is called, 
allowing you to define your own function routing rules." Therefore AppuntoAuth assumes any call to a controller with a _remap
function could be a call to the _remap function and verifies the user's permissions for the _remap function. 

If additional access levels are desired in a controller with a _remap function, the developer must add them to the controller code. 
