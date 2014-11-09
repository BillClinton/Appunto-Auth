/*
 * Translation by Loanda Drew and Ricardo Silva
 */
var Language = 
{
	override:
	{
		// Global
		name			: 'Nome', //used in headers for various entities
		description		: 'Descri&ccedil;&atilde;o', //used in headers for various entities
		refresh			: 'Atualizar', // reload the data
		result			: 'Resultado',
		save			: 'Salvar',
		cancel			: 'Cancelar',
		yes				: 'Sim',
		no				: 'N&atilde;o',
		ok				: 'Ok',
		loading			: 'Carregando...',
		field_required	: 'Este campo &eacute; obrigat&oacute;rio',
		paging_message	: 'Exibindo {0} - {1} de {2}',

		// Proxy errors
		server_error_title		: 'Erro de servidor',
		server_error_unknown	: 'Erro desconhecido: O servidor n&atilde;o enviou qualquer informa&ccedil;&atilde;o sobre o erro.',
		server_error_no_response: 'Erro desconhecido: O servidor n&atilde;o enviou nenhuma resposta.',
		server_error_decode		: 'Erro na decodifica&ccedil;&atilde;o da resposta enviada pelo servidor.',
		server_error_undefined	: 'Erro de servidor indefinido',


		// Application tabs
		tab_status		: 'Status',
		tab_users		: 'Usu&aacute;rios',
		tab_user_roles	: 'Fun&ccedil;&otilde;es do usu&aacute;rio',
		tab_permissions	: 'Permiss&otilde;es',
		tab_paths		: 'Caminhos',
		tab_sessions	: 'Sess&otilde;es',

		// usu&aacute;rio list 
		username			: 'Usu&aacute;rio',
		name				: 'Nome',
		surname				: 'Sobrenome',
		email				: 'Email',
		email_format		: 'Este campo deve ser um endere&ccedil;o de email no formato "nome@exemplo.com"',
		password			: 'Senha',
		password_confirm	: 'Confirmar senha',
		password_change		: 'Alterar senha',
		password_match		: 'As senhas usadas n&atilde;o s&atilde;o iguais',
		password_format		: 'Senhas devem ter entre 6 e 16 caracteres, e incluir no m&iacute;nimo uma letra mai&uacute;scula, uma letra min&uacute;scula e um d&iacute;gito num&eacute;rico',
		user_set_active		: 'Configurar usu&aacute;rio como ativo',
		active				: 'Ativo',  // Whether or not this User has been activated or deactivated
		user_add			: 'Adicionar usu&aacute;rio',
		user_edit			: 'Editar usu&aacute;rio',
		user_delete			: 'Apagar usu&aacute;rio',
		user_delete_confirm	: 'Tem certeza que deseja apagar este usu&aacute;rio?',
		user_activate		: 'Ativar usu&aacute;rio',
		user_deactivate		: 'Desativar usu&aacute;rio',
		last_ip				: '&Uacute;ltimo IP',
		last_login			: '&Uacute;ltimo Login',
		created				: 'Criado',
		modified			: 'Modificado',
		never				: 'Nunca',
		user_select			: 'Selecione um usu&aacute;rio',
		user_select_or		: 'Selecione um usu&aacute;rio ou <b>Mostre Todos</b> acima.',
		user_no_roles		: 'Nenhuma fun&ccedil;&atilde;o est&aacute; associada a este usu&aacute;rio.  Selecione <b>Mostrar Todos</b> para ver as fun&ccedil;&otilde;es dispon&iacute;veis.',
		user_no_perm		: 'Nenhuma permiss&atilde;o est&aacute; associada a este usu&aacute;rio.  Selecione <b>Mostrar Todos</b> para ver as permiss&otilde;es dispon&iacute;veis.',
		user_role_list		: 'Fun&ccedil;&otilde;es do usu&aacute;rio',
		user_role_list_for	: 'Fun&ccedil;&otilde;es do usu&aacute;rio para', //will be followed by username
		user_role_add		: 'Adicionar usu&aacute;rio a fun&ccedil;&atilde;o',
		user_role_remove	: 'Remover usu&aacute;rio da fun&ccedil;&atilde;o',
		user_perm_list		: 'Permiss&otilde;es do aplicativo',
		user_perm_list_for	: 'Permiss&otilde;es do aplicativo para', //will be followed by username
		user_perm_add		: 'Conceder permiss&atilde;o ao usu&aacute;rio',
		user_perm_remove	: 'Remover permiss&atilde;o do usu&aacute;rio',
		user_role_view_all		: 'Mostrar todas as fun&ccedil;&otilde;es',
		user_role_view_selected	: 'Mostrar apenas as fun&ccedil;&otilde;es do usu&aacute;rio selecionado', 
		user_perm_view_all		: 'Mostrar todas as permiss&otilde;es', 
		user_perm_view_selected	: 'Mostrar apenas as permiss&otilde;es do usu&aacute;rio selecionado',
		granted_to				: 'Concedido a',  // permission is granted to user or to the user's role
		grant_role				: 'Fun&ccedil;&atilde;o',
		grant_user				: 'Usu&aacute;rio',
		user_perm_granted_role	: 'permiss&atilde;o concedida via fun&ccedil;&atilde;o',
		user_perm_granted_user	: 'permiss&atilde;o concedida ao usu&aacute;rio',
	

		// Role list
		role_add				: 'Adicionar fun&ccedil;&atilde;o',
		role_edit				: 'Editar fun&ccedil;&atilde;o',
		role_delete				: 'Apagar fun&ccedil;&atilde;o',
		role_delete_confirm		: 'Tem certeza que deseja apagar esta fun&ccedil;&atilde;o?',
		role_perm_view_all		: 'Mostrar todas as permiss&otilde;es',
		role_perm_view_selected	: 'Mostrar apenas as permis&otilde;es da fun&ccedil;&atilde;o selecionada', 
		role_perm_for			: 'Permiss&otilde;es para',
		role_select				: 'Selecionar uma Fun&ccedil;&atilde;o ou <b>Mostrar Todas</b> acima.', 
		role_perm_add 			: 'Adicionar permiss&atilde;o &agrave; fun&ccedil;&atilde;o', 
		role_perm_remove		: 'Remover periss&atilde;o da fun&ccedil;&atilde;o',

		// Permission list
		perm_internal_name		: 'Nome Interno',
		perm_add				: 'Adicionar permiss&atilde;o',
		perm_edit				: 'Editar permiss&atilde;o',
		perm_delete				: 'Apagar permiss&atilde;o',
		perm_delete_confirm		: 'Tem certeza que deseja apagar esta permiss&atilde;o?',
		
		// Path list
		path_tab_controllers	: 'Controladores',
		path_tab_paths			: 'Caminhos',
		controller_methods		: 'm&eacute;todos',
		controller_public		: 'p&uacute;blico',
		controller_private		: 'privado',
		path_verify				: 'Verificando caminhos do aplicativo',
		path_refreshing			: 'Atualizando caminhos',
		path_public				: 'P&uacute;blico',
		path_private			: 'Privado',
		path_method				: 'M&eacute;todo',  // A Codeigniter function inside a controller
		path_path				: 'Caminho',
		path_access				: 'Acesso',  // Header for public/private column
		path_permission			: 'Permiss&atilde;o',
		path_permissions		: 'Permiss&otilde;es',
		path_set_public			: 'Tornar caminho p&uacute;blico',
		path_set_private		: 'Tornar caminho privado',
		path_set_permission		: 'Configurar permiss&atilde;o',
		path_remove_permission	: 'Remover Permiss&atilde;o',
		path_delete				: 'Apagar caminho',
		path_not_found_1		: 'Este m&eacute;todo n&atilde;o foi encontrado no controlador, mas existe um registro dele no banco de dados.', 
		path_not_found_2		: 'Voc&ecirc; pode apagar o registro deste caminho.', 

		// Session List
		session_username		: 'usu&aacute;rio',
		session_last_activity	: '&Uacute;ltima Atividade',
		session_ip_address		: 'Endere&ccedil;o de IP',
		session_user_agent		: 'User Agent', // User Agent string returned by usu&aacute;rio's browser
		session_view_all		: 'Mostrar todas as sess&otilde;es', 
		session_view_logged_in	: 'Mostrar apenas as sess&otilde;es ativas', 
		session_delete			: 'Apagar sess&atilde;o',
		session_delete_confirm	: 'Tem certeza que deseja apagar esta sess&atilde;o?', 
		session_delete_user		: 'usu&aacute;rio', // used in delete confirmation window title eg: "user: Bob Jones"


		// dummy val so I don't forget to remove trailing comma
		dummy			: ''
	}
};
