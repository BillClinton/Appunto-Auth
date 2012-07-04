Ext.define('APPA.view.user.PermissionContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_permission_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Grant user permission',
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : 'Revoke user permission',
            action  : 'remove', 
            iconCls : 'lock-delete'
		}
    ]
})
