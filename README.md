# Appunto-Auth

An authentication spark for CodeIgniter with a Sencha Ext JS interface and a simple ACL.

__This is still in testing. __

## Features
 - Administrative interface using ExtJS
 - Authentication performed in pre-controller hook rather than controller code
 - Simple ACL with roles and permissions
 - Restrict/Allow access using controller/function paths
 - Hashes passwords in database using phpass library

## Installing

### CodeIgniter Setup

Enable CodeIgniter to use the database to store sessions by following the instructions 
in the _Saving Session Data to a Database_ section of the _Session Class_ page in the CodeIgniter
User Guide located at http://codeigniter.com/user_guide/libraries/sessions.html

 - create the ci_sessions database table
 - enable the database option in your config.php by setting __sess_use_database__ to TRUE in your config.php

### Get The Spark

Appunto Auth is available via Sparks.  For information on installing sparks, go here: http://getsparks.org/install

If you have the Spark Manager installed, type:

```php tools/spark install appunto-auth``` (Linux or OSX)

or

```php tools\spark install appunto-auth``` (Windows)


### Copy additional directories

In order to create its interface, Appunto Auth relies on controller, view and resource files that are not 
distributed automatically by the Spark Manager.  These directories must be copied to your application's 
directory structure manually.

#### Controllers Directory
Copy the controllers/appunto-auth directory to your application's controller directory so your application's
directory structure looks like this: 
```
   .
   |-application
   |---controllers
   |-----appunto-auth
```
#### Views Directory
Copy the views/appunto-auth directory to your application's views directory so your application's
directory structure looks like this: 
```
   .
   |-application
   |---views
   |-----appunto-auth
```

#### Language Directory
Copy the appunto_auth_lang.php file from the language/english directory to your application's language directory so your application's
directory structure looks like this: 
```
   .
   |-application
   |---language
   |-----english
   appunto-auth_lang.php
```

#### Resources Directory
Copy the resources directory to your application directory so your application's
directory structure looks like this: 
```
   .
   |-application
   |-resources
     index.php
```

### Update Codeigniter configuration files

#### Include Reference to Hook in hooks.php
Appunto Auth authenticates the user in a post_controller_constructor hook. The hook function resides in the Appunto_auth.php 
library file.  A reference to this hook must be included in CodeIgniter's config/hooks.php file using the following format:

```
$hook['post_controller_constructor'] = array(
	'class'    => 'Appunto_auth',
	'function' => 'require_authentication_hook',
	'filename' => 'Appunto_auth.php',
	'filepath' => 'libraries',
	'params'   => array()
);
```
#### Enable CodeIgniter hooks
Enable CodeIgniter hooks by setting __enable_hooks__ to TRUE in your application's config.php

__Note__: If hooks are not enabled, no authentication will be performed
