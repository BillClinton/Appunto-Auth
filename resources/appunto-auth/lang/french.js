var Language = 
{
	override:
	{
		// Global
		name			: 'Nom', 		 //used in headers for various entities
		description		: 'Description', //used in headers for various entities
		refresh			: 'Rafraichir',  // reload the data
		result			: 'R&eacute;sultat',
		save			: 'Sauver',
		cancel			: 'Annuler',
		yes				: 'Oui',
		no				: 'Non',
		ok				: 'Ok',
		loading			: 'Chargement...',
		field_required	: 'Ce champ est obligatoire',
		paging_message	: 'Affichage {0} - {1} of {2}',

		// Proxy errors
		server_error_title		: 'Erreur de serveur',
		server_error_unknown	: 'Erreur inconnue : Le serveur n&apos;a retourn&eacute; aucune information sur l&apos;erreur.',
		server_error_no_response: 'Erreur inconnue : le serveur n&apos;a retourn&eacute; aucune r&eacute;ponse.',
		server_error_decode		: 'Erreur de d&eacute;codage de la r&eacute;ponse envoy&eacute;e par le serveur.',
		server_error_undefined	: 'Erreur serveur inconnue',

		// Application tabs
		tab_status		: 'Status',
		tab_users		: 'Utilisateurs',
		tab_user_roles	: 'R&ocirc;les utilisateur',
		tab_permissions	: 'Authorisations',
		tab_paths		: 'Chemins',
		tab_sessions	: 'Sessions',

		// User list 
		username			: 'Nom d&apos;utilisateur',
		name				: 'Pr&eacute;nom',
		surname				: 'Nom de famille',
		email				: 'Email',
		email_format		: 'Ce champ doit &ecirc;tre une adresse e-mail dans le format "user@example.com"',
		password			: 'Mot de passe',
		password_confirm	: 'Confirmez le mot de passe',
		password_change		: 'Changer le mot de passe',
		password_match		: 'Les mots de passe ne correspondent pas',
		password_format		: 'Le mot de passe doit &ecirc;tre d&apos;au moins 6 caract&egrave;res, pas plus de 16 caract&egrave;res, et doit inclure au moins une lettre majuscule, une lettre minuscule et un chiffre.',
		user_set_active		: 'R&eacute;glez utilisateur comme actif',
		active				: 'Actif',  // Whether or not this user has been activated or deactivated
		user_add			: 'Ajouter un utilisateur',
		user_edit			: 'Editer un utilisateur',
		user_delete			: 'Effacer l&apos;utilisateur',
		user_delete_confirm	: '&Ecirc;tes-vous s&ucirc;r de vouloir supprimer cet utilisateur ?',
		user_activate		: 'Activer l&apos;utilisateur',
		user_deactivate		: 'D&eacute;sactiver l&apos;utilisateur',
		last_ip				: 'Derni&egrave;re IP',
		last_login			: 'Derni&egrave;re connexion',
		created				: 'Cr&eacute;&eacute; le',
		modified			: 'Modifi&eacute; le',
		never				: 'Jamais',
		user_select			: 'S&eacute;lectionnez un utilisateur',
		user_select_or		: 'S&eacute;lectionnez un Utilisateur ou s&eacute;lectionnez <b>Voir tous</b> ci-dessus.',
		user_no_roles		: 'Aucun r&ocirc;les ne sont attribu&eacute;s &agrave; cet utilisateur. S&eacute;lectionnez <b>Voir tous</b> pour une liste des r&ocirc;les disponibles',
		user_no_perm		: 'Aucune permissions ne sont attribu&eacute;s &agrave; cet utilisateur. S&eacute;lectionnez <b>Voir tous</b> pour une liste des permissions disponibles',
		user_role_list		: 'R&ocirc;les utilisateur',
		user_role_list_for	: 'R&ocirc;les utilisateur pour', //will be followed by username
		user_role_add		: 'Ajouter l&apos;utilisateur au r&ocirc;le',
		user_role_remove	: 'Supprimer l&apos;utilisateur du r&ocirc;le',
		user_perm_list		: 'Autorisations d&apos;application',
		user_perm_list_for	: 'Autorisations d&apos;application pour', //wilbe followed by username
		user_perm_add		: 'Accorder la permission &agrave; l&apos;utilisateur',
		user_perm_remove	: 'R&eacute;voquer la permission de l&apos;utilisateur',
		user_role_view_all		: 'Voir tous les r&ocirc;les',
		user_role_view_selected	: 'Afficher uniquement les r&ocirc;les pour l&apos;utilisateur s&eacute;lectionn&eacute;',
		user_perm_view_all		: 'Voir toutes les autorisations',
		user_perm_view_selected	: 'Afficher uniquement les autorisations pour l&apos;utilisateur s&eacute;lectionn&eacute;',
		granted_to				: 'Accord&eacute;e &agrave;',  // permission is granted to user or to the user's role
		grant_role				: 'R&ocirc;le',
		grant_user				: 'Utilisateur',
		user_perm_granted_role	: 'autorisation accord&eacute;e par r&ocirc;le',
		user_perm_granted_user	: 'autorisation accord&eacute;e &agrave; l&apos;utilisateur',
	

		// Role list
		role_add				: 'Ajouter un r&ocirc;le',
		role_edit				: 'Editer le r&ocirc;le',
		role_delete				: 'Effacer le r&ocirc;le',
		role_delete_confirm		: '&Ecirc;tes-vous s&ucirc;r de vouloir supprimer ce r&ocirc;le ?',
		role_perm_view_all		: 'Voir toutes les autorisations',
		role_perm_view_selected	: 'Afficher uniquement les autorisations pour le r&ocirc;le s&eacute;lectionn&eacute;',
		role_perm_for			: 'Autorisations pour',
		role_select				: 'S&eacute;lectionnez un r&ocirc;le ou s&eacute;lectionnez <b>Voir tous</b> ci-dessus.',
		role_perm_add 			: 'Ajouter l&apos;autorisation au r&ocirc;le',
		role_perm_remove		: 'Ajouter l&apos;autorisation du r&ocirc;le',

		// Permission list
		perm_internal_name		: 'Nom interne',
		perm_add				: 'Ajouter une autorisation',
		perm_edit				: '&Eacute;diter l&apos;autorisation',
		perm_delete				: 'Supprimer l&apos;autorisation',
		perm_delete_confirm		: '&Ecirc;tes-vous s&ucirc;r de vouloir supprimer cette autorisation ?',
		

		// Path list
		path_tab_controllers	: 'Contr&ocirc;leurs',
		path_tab_paths			: 'Chemins',
		controller_methods		: 'm&eacute;thodes',
		controller_public		: 'public',
		controller_private		: 'priv&eacute;',
		path_verify				: 'V&eacute;rification des chemins de l&apos;application',
		path_refreshing			: 'Rafraichissement des chemins',
		path_public				: 'Public',
		path_private			: 'Privé',
		path_method				: 'M&eacute;thode',  // A Codeigniter function inside a controller
		path_path				: 'Chemin',
		path_access				: 'Acc&egrave;s',  // Header for public/private column
		path_permission			: 'Autorisation',
		path_permissions		: 'Autorisations',
		path_set_public			: 'Rendre le chemin public',
		path_set_private		: 'Rendre le chemin priv&eacute;',
		path_set_permission		: 'D&eacute;finir l&apos;autorisation',
		path_remove_permission	: 'Retirer l&apos;autorisation',
		path_delete				: 'Supprimer le chemin',
		path_not_found_1		: 'Cette m&eacute;thode n&apos;a pas &eacute;t&eacute; trouv&eacute; dans le contr&ocirc;leur, mais un enregistrement de celle-ci existe dans la base de donn&eacute;es.',
		path_not_found_2		: 'Vous pouvez supprimer l&apos;enregistrement de ce chemin.',

		// Session List
		session_username		: 'Nom d&apos;utilisateur',
		session_last_activity	: 'Derni&egrave;re activit&eacute;',
		session_ip_address		: 'Addresse IP',
		session_last_page		: 'Derni&egrave;re Page',
		session_user_agent		: 'User Agent', // User-Agent string returned by user's browser
		session_view_all		: 'Afficher toutes les sessions',
		session_view_logged_in	: 'Afficher seulement les sessions connect&eacute;es',
		session_delete			: 'Supprimer la Session',
		session_delete_confirm	: '&Ecirc;tes-vous s&ucirc;r de vouloir supprimer cette session ?',
		session_delete_user		: 'utilisateur', // used in delete confirmation window title eg: "user: Bob Jones"


		// dummy val so I don't forget to remove trailing comma
		dummy			: ''
	}
};
