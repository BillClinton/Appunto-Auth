# Appunto-Auth

An authentication spark for CodeIgniter with a simple ACL and ExtJS interface.

## Features
 - Administrative interface using ExtJS
 - Authentication performed in pre-controller hook rather than controller code
 - Simple ACL with roles and permissions
 - Restrict/Allow access using controller/function paths
 - Encrypts passwords in database using phpass library

## Installing

### Codeigniter Setup

Enable CodeIgniter to use the database to store session information by following the instructions 
in the _Saving Session Data to a Database section_ of the _Session Class_ page in the CodeIgniter
User Guide located at http://codeigniter.com/user_guide/libraries/sessions.html

 - create the ci_sessions database table
 - enable the database option in your config.php by setting sess_use_database to TRUE in your config.php

### Get The Spark

Appunto Auth is available via Sparks.  For info about how to install sparks, go here: http://getsparks.org/install

### Copy additional files


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
