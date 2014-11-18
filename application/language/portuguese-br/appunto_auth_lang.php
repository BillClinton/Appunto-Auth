<?php

/**
 *  Text used by login form
 */
$lang['appunto_form_username'] = 'Login';
$lang['appunto_form_password'] = 'Senha';
$lang['appunto_form_login_button'] = 'Login';
$lang['appunto_form_logout_button'] = 'Logout';
$lang['appunto_form_forgot_password'] = 'Esqueceu a senha?';
$lang['appunto_form_invalid_login'] = 'Usu&aacute;rio e/ou senha inv&aacute;lidos.';

/**
 *  Text used by reset password form
 */
$lang['appunto_form_forgot_pw_username'] = 'Usu&aacute;rio';
$lang['appunto_form_forgot_pw_button'] = 'Enviar o link de recupera&ccedil;&atilde;o de senha';

/**
 *  Messages
 */
$lang['appunto_message_logout'] = 'You have been successfully logged out.';
$lang['appunto_message_default_error'] = 'Voc&ecirc; saiu com sucesso.';

/**
 *  Errors used by library's authentication hook
 */
$lang['appunto_not_authorized'] = 'Voc&ecirc; n&atilde;o est&aacute; autorizado a executar esta opera&ccedil;&atilde;o.';
$lang['appunto_login_required'] = 'Por favor, identifique-se para executar esta opera&ccedil;&atilde;o.';
$lang['appunto_invalid_path'] = 'Voc&ecirc; solicitou um caminho inv&aacute;lido.';

/**
 *  Errors used by admin UI controller
 */
$lang['appunto_errors_encountered'] = 'Foram encontrados erros com seu pedido. Por favor, corrija-os e tente novamente.';
$lang['appunto_password_strength_fail'] = 'Senhas devem ter entre 6 e 16 caracteres, e incluir no m&iacute;nimo uma letra mai&uacute;scula, uma letra min&uacute;scula e um d&iacute;gito num&eacute;rico';
$lang['appunto_permission_in_use_by_user'] = 'Esta permiss&atilde;o est&aacute; atualmente atribu&iacute;da a um ou mais usu&aacute;rios e n&atilde;o pode ser apagada.';
$lang['appunto_permission_in_use_by_role'] = 'Esta permiss&atilde;o est&aacute; atualmente atribu&iacute;da a uma ou mais fun&ccedil;&otilde;es e n&atilde;o pode ser apagada.';
$lang['appunto_permission_in_use_by_path'] = 'Esta permiss&atilde;o est&aacute; atualmente atribu&iacute;da a um ou mais caminhos e n&atilde;o pode ser apagada.';
$lang['appunto_role_in_use_by_user'] = 'Esta fun&ccedil;&atilde;o est&aacute; atualmente atribu&iacute;da a um ou mais usu&aacute;rios e n&atilde;o pode ser apagada.';
$lang['appunto_role_in_use_by_permission'] = 'Atualmente uma ou mais permiss&otilde;es est&atilde;o atribu&iacute;das a esta fun&ccedil;&atilde;o e ela n&atilde;o pode ser apagada';
$lang['appunto_path_found_in_filesystem'] = 'Este caminho n&atilde;o pode ser apagado porque foi encontrado em seu sistema de arquivos da &uacute;ltima vez que os caminhos foram verificadas. <br><br>Atualize caminhos, se voc&ecirc; achar que recebeu esta mensagem por engano.';
$lang['appunto_no_hook'] = 'Nenhuma autentica&ccedil;&atilde;o est&aacute; sendo realizada!';
$lang['appunto_set_true'] = 'Defina este valor para "verdadeiro"';
$lang['appunto_db_sessions'] = 'Sess&otilde;es usando banco de dados';
$lang['appunto_csrf_protection'] = 'CSRF protection enabled';
$lang['appunto_encrypted_cookies'] = 'Sess&otilde;es usando cookies criptografados';
$lang['appunto_private_sans_perm'] = 'Caminhos privados sem permiss&otilde;es vis&iacute;veis';
$lang['appunto_private_sans_perm_warn'] = 'caminhos privados sem permiss&otilde;es definidas vis&iacute;veis para qualquer usu&aacute;rio conectado';
$lang['appunto_no_homonymous_controllers'] = 'AppuntoAuth n&atilde;o suporta classes do controlador com o mesmo nome em diferentes diret&oacute;rios.';
