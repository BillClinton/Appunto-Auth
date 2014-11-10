var Language = 
{
	override:
	{
		// Global
		name			: 'Name', //used in headers for various entities
		description		: 'Description', //used in headers for various entities
		refresh			: 'Refresh', // reload the data
		result			: 'Result',
		save			: 'Save',
		cancel			: 'Cancel',
		yes				: 'Yes',
		no				: 'No',
		ok				: 'Ok',
		loading			: 'Loading...',
		field_required	: 'This field is required',
		paging_message	: 'Displaying {0} - {1} of {2}',

		// Proxy errors
		server_error_title		: 'Server error',
		server_error_unknown	: 'Unknown error: The server did not send any information about the error.',
		server_error_no_response: 'Unknown error: Server did not send a response.',
		server_error_decode		: 'Error decoding the response sent by the server.',
		server_error_undefined	: 'Undefined Server Error',

		// Application tabs
		tab_status		: 'Status',
		tab_users		: 'Users',
		tab_user_roles	: 'User Roles',
		tab_permissions	: 'Permissions',
		tab_paths		: 'Paths',
		tab_sessions	: 'Sessions',

		// User list 
		username			: 'Username',
		name				: 'Name',
		surname				: 'Last name',
		email				: 'Email',
		email_format		: 'This field should be an e-mail address in the format "user@example.com"',
		password			: 'Password',
		password_confirm	: 'Confirm password',
		password_change		: 'Change password',
		password_match		: 'Passwords do not match',
		password_format		: 'Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.',
		user_set_active		: 'Set user as active',
		active				: 'Active',  // Whether or not this user has been activated or deactivated
		user_add			: 'Add user',
		user_edit			: 'Edit user',
		user_delete			: 'Delete user',
		user_delete_confirm	: 'Are you sure you want to delete this user?',
		user_activate		: 'Activate user',
		user_deactivate		: 'Deactivate user',
		last_ip				: 'Last IP',
		last_login			: 'Last Login',
		created				: 'Created',
		modified			: 'Modified',
		never				: 'Never',
		user_select			: 'Select a user',
		user_select_or		: 'Select a User or select <b>Show All</b> above.',
		user_no_roles		: 'No roles are assigned to this user.  Select <b>Show All</b> for a list of available roles',
		user_no_perm		: 'No permissions are assigned to this user.  Select <b>Show All</b> for a list of available permissions',
		user_role_list		: 'User roles',
		user_role_list_for	: 'User roles for', //will be followed by username
		user_role_add		: 'Add user to role',
		user_role_remove	: 'Remove user from role',
		user_perm_list		: 'Application permissions',
		user_perm_list_for	: 'Application permissions for', //wilbe followed by username
		user_perm_add		: 'Grant user permission',
		user_perm_remove	: 'Revoke user permission',
		user_role_view_all		: 'Show all roles',
		user_role_view_selected	: 'Show only roles for the selected user',
		user_perm_view_all		: 'Show all permissions',
		user_perm_view_selected	: 'Show only permissions for the selected user',
		granted_to				: 'Granted to',  // permission is granted to user or to the user's role
		grant_role				: 'Role',
		grant_user				: 'User',
		user_perm_granted_role	: 'permission granted through role',
		user_perm_granted_user	: 'permission granted to user',
	

		// Role list
		role_add				: 'Add role',
		role_edit				: 'Edit role',
		role_delete				: 'Delete role',
		role_delete_confirm		: 'Are you sure you want to delete this role?',
		role_perm_view_all		: 'Show all permissions',
		role_perm_view_selected	: 'Show only permissions for the selected role',
		role_perm_for			: 'Permissions for',
		role_select				: 'Select a Role or select <b>Show All</b> above.',
		role_perm_add 			: 'Add permission to role',
		role_perm_remove		: 'Remove permission from role',

		// Permission list
		perm_internal_name		: 'Internal Name',
		perm_add				: 'Add permission',
		perm_edit				: 'Edit permission',
		perm_delete				: 'Delete permission',
		perm_delete_confirm		: 'Are you sure you want to delete this permission?',
		

		// Path list
		path_tab_controllers	: 'Controllers',
		path_tab_paths			: 'Paths',
		controller_methods		: 'methods',
		controller_public		: 'public',
		controller_private		: 'private',
		path_verify				: 'Verifing application paths',
		path_refreshing			: 'Refreshing paths',
		path_public				: 'Public',
		path_private			: 'Private',
		path_method				: 'Method',  // A Codeigniter function inside a controller
		path_path				: 'Path',
		path_access				: 'Access',  // Header for public/private column
		path_permission			: 'Permission',
		path_permissions		: 'Permissions',
		path_set_public			: 'Make path public',
		path_set_private		: 'Make path private',
		path_set_permission		: 'Set Permission',
		path_remove_permission	: 'Remove Permission',
		path_delete				: 'Delete Path',
		path_not_found_1		: 'This method was not found in the Controller but a record of it exists in the database.',
		path_not_found_2		: 'You may delete the record of this path.',

		// Session List
		session_username		: 'Username',
		session_last_activity	: 'Last Activity',
		session_ip_address		: 'IP Address',
		session_last_page		: 'Last Page',
		session_user_agent		: 'User Agent', // User-Agent string returned by user's browser
		session_view_all		: 'Show all sessions',
		session_view_logged_in	: 'Show only logged in sessions',
		session_delete			: 'Delete Session',
		session_delete_confirm	: 'Are you sure you want to delete this session?',
		session_delete_user		: 'user', // used in delete confirmation window title eg: "user: Bob Jones"


		// dummy val so I don't forget to remove trailing comma
		dummy			: ''
	}
};
