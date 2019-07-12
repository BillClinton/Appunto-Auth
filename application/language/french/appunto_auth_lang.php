<?php

/**
 *  Text used by login form
 */
$lang['appunto_form_username'] = 'Login';
$lang['appunto_form_password'] = 'Mot de passe';
$lang['appunto_form_login_button'] = 'Connexion';
$lang['appunto_form_logout_button'] = 'D&eacute;connexion';
$lang['appunto_form_forgot_password'] = 'Mot de passe oubli&eacute; ?';
$lang['appunto_form_invalid_login'] = 'Nom d&apos;utilisateur / mot de passe invalide.';

/**
 *  Text used by reset password form
 */
$lang['appunto_form_forgot_pw_username'] = 'Nom d&apos;utilisateur';
$lang['appunto_form_forgot_pw_button'] = 'Envoyer le lien de r&eacute;initialisation du mot de passe';

/**
 *  Messages
 */
$lang['appunto_message_logout'] = 'Vous avez &eacute;t&eacute; d&eacute;connect&eacute; correctement.';
$lang['appunto_message_default_error'] = 'Erreur d&apos;authentification.';

/**
 *  Errors used by library's authentication hook
 */
$lang['appunto_not_authorized'] = 'Vous n&apos;&ecirc;tes pas autoris&eacute; &agrave; effectuer l&apos;op&eacute;ration demand&eacute;e.';
$lang['appunto_login_required'] = 'Veuillez vous identifier pour effectuer cette op&eacute;ration.';
$lang['appunto_invalid_path'] = 'Vous avez demand&eacute; un chemin non valide.';

/**
 *  Errors used by admin UI controller
 */
$lang['appunto_errors_encountered'] = 'Des erreurs ont &eacute;t&eacute; rencontr&eacute;es avec votre demande. S&apos;il vous pla&icirc;t, corriger et essayer &agrave; nouveau.';
$lang['appunto_password_strength_fail'] = 'Le mot de passe doit &ecirc;tre d&apos;au moins 6 caract&egrave;res, pas plus de 16 caract&egrave;res, et doit inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.';
$lang['appunto_permission_in_use_by_user'] = 'Le mot de passe doit &ecirc;tre d&apos;au moins 6 caract&egrave;res, pas plus de 16 caract&egrave;res, et doit inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.';
$lang['appunto_permission_in_use_by_role'] = 'Cette autorisation est actuellement affect&eacute; &agrave; un ou plusieurs r&ocirc;les et ne peut &ecirc;tre supprim&eacute;.';
$lang['appunto_permission_in_use_by_path'] = 'Cette autorisation est actuellement affect&eacute; &agrave; un ou plusieurs chemins et ne peut &ecirc;tre supprim&eacute;.';
$lang['appunto_role_in_use_by_user'] = 'Ce r&ocirc;le est actuellement affect&eacute; &agrave; un ou plusieurs utilisateurs et ne peut &ecirc;tre supprim&eacute;. ';
$lang['appunto_role_in_use_by_permission'] = 'Il y a actuellement une ou plusieurs autorisations attribu&eacute;es &agrave; ce r&ocirc;le et il ne peuvent pas &ecirc;tre supprim&eacute;s.';
$lang['appunto_path_found_in_filesystem'] = 'Ce chemin ne peut pas &ecirc;tre supprim&eacute; car il a &eacute;t&eacute; trouv&eacute; sur votre syst&egrave;me de fichiers la derni&egrave;re fois que les chemins ont &eacute;t&eacute; v&eacute;rifi&eacute;s.<br><br>S&apos;il vous pla&icirc;t, rafra&icirc;chissez vos chemins si vous croyez que vous avez re&ccedil;u ce message par erreur.';
$lang['appunto_no_hook'] = 'No authentication is being performed!';
$lang['appunto_set_true'] = 'Envisager de mettre cette valeur &agrave; vrai';
$lang['appunto_db_sessions'] = 'Sessions utilisant la base de donn&eacute;es';
$lang['appunto_csrf_protection'] = 'Protection CSRF activ&eacute;e';
$lang['appunto_encrypted_cookies'] = 'Sessions utilisant les cookies crypt&eacute;s';
$lang['appunto_private_sans_perm'] = 'Chemins priv&eacute;s sans autorisations de visualisation';
$lang['appunto_private_sans_perm_warn'] = 'Private paths without defined permissions viewable to any logged in user';
$lang['appunto_no_homonymous_controllers'] = 'AppuntoAuth ne prend pas en charge les classes de contr&ocirc;leur avec le m&ecirc;me nom dans des r&eacute;pertoires diff&eacute;rents.';
