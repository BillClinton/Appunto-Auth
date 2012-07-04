# Appunto-Auth

An authentication spark for CodeIgniter with a Sencha Ext JS interface and a simple ACL.

## Features
 - Administrative interface using ExtJS
 - Authentication performed in pre-controller hook rather than controller code
 - Simple ACL with roles and permissions
 - Restrict/Allow access using controller/function paths
 - Encrypts passwords in database using phpass library

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
'php tools/spark install appunto-auth
(use a backslash on Windows (eg. php tools\spark install appunto-auth)

### Copy additional files

#### Controllers Directory
Copy the controllers/appunto-auth directory to your application's controller directory so your directory 
structure looks like this: 
```
   .
   |-application
   |---controllers
   |-----appunto-auth
```
#### Views Directory
Copy the views/appunto-auth directory to your application's views directory so your directory 
structure looks like this: 
```
   .
   |-application
   |---views
   |-----appunto-auth
```

### Include Reference to Hook in hooks.php
Appunto Auth authenticates the user in a pre-controller hook. The hook function resides in the Appunto_auth.php 
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
