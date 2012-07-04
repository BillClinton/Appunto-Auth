Ext.define('APPA.view.user.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add User',
            action  : 'add', 
            iconCls : 'user-add'
        },
        {
            text    : 'Edit User',
            action  : 'edit', 
            iconCls : 'user-edit'
        },
        {
            text    : 'Delete User',
            action  : 'delete', 
            iconCls : 'user-delete'
        },
        {
            text    : 'Change Password',
            action  : 'change_password', 
            iconCls : 'key'
        },
		{
			text    : 'Activate user',
			action  : 'activate',
			iconCls : 'wand'
        },
		{
			text    : 'Deactivate user',
			action  : 'deactivate',
			iconCls : 'delete'
		}
    ]
})
