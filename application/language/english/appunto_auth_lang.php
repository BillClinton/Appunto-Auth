<?php

/**
 *  Text used by login form
 */
$lang['appunto_form_username'] = 'Login';
$lang['appunto_form_password'] = 'Password';
$lang['appunto_form_login_button'] = 'Login';
$lang['appunto_form_logout_button'] = 'Logout';
$lang['appunto_form_forgot_password'] = 'Forgot Password?';
$lang['appunto_form_invalid_login'] = 'Invalid username/password combination.';

/**
 *  Text used by reset password form
 */
$lang['appunto_form_forgot_pw_username'] = 'Username';
$lang['appunto_form_forgot_pw_button'] = 'Send password reset link';

/**
 *  Messages
 */
$lang['appunto_message_logout'] = 'You have been successfully logged out.';
$lang['appunto_message_default_error'] = 'Authentication Error.';

/**
 *  Errors used by library's authentication hook
 */
$lang['appunto_not_authorized'] = 'You are not authorized to perform the requested operation.';
$lang['appunto_login_required'] = 'Please login to perform that operation.';
$lang['appunto_invalid_path'] = 'You have requested an invalid path.';

/**
 *  Errors used by admin UI controller
 */
$lang['appunto_errors_encountered'] = 'Errors were encountered with your request.  Please correct them and try again.';
$lang['appunto_password_strength_fail'] = 'Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.';
$lang['appunto_permission_in_use_by_user'] = 'This permission is currently assigned to one or more users and cannot be deleted.';
$lang['appunto_permission_in_use_by_role'] = 'This permission is currently assigned to one or more roles and cannot be deleted.';
$lang['appunto_permission_in_use_by_path'] = 'This permission is currently assigned to one or more paths and cannot be deleted.';
$lang['appunto_role_in_use_by_user'] = 'This role is currently assigned to one or more users and cannot be deleted. ';
$lang['appunto_role_in_use_by_permission'] = 'There are currently one or more permissions assigned to this role and it cannot be deleted.';
$lang['appunto_path_found_in_filesystem'] = 'This path cannot be deleted because it was found on your filesystem the last time paths were verified.<br><br>Please refresh paths if you believe you have received this message in error.';
$lang['appunto_no_hook'] = 'No authentication is being performed!';
$lang['appunto_set_true'] = 'Consider setting this value to true';
$lang['appunto_db_sessions'] = 'Sessions using database';
$lang['appunto_csrf_protection'] = 'CSRF protection enabled';
$lang['appunto_encrypted_cookies'] = 'Sessions using encrypted cookies';
$lang['appunto_private_sans_perm'] = 'Private paths without permissions viewable';
$lang['appunto_private_sans_perm_warn'] = 'Private paths without defined permissions viewable to any logged in user';
$lang['appunto_no_homonymous_controllers'] = 'AppuntoAuth does not support controller classes with the same name in different directories.';
