Ext.define('APPA.view.user.RoleContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_role_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add user to role',
            action  : 'add', 
            iconCls : 'shield-add'
        },
        {
            text    : 'Remove user from role',
            action  : 'remove', 
            iconCls : 'shield-delete'
		}
    ]
})
