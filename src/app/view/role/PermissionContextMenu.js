Ext.define('APPA.view.role.PermissionContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_role_permission_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add permission to role',
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : 'Remove permission from role',
            action  : 'remove', 
            iconCls : 'lock-delete'
		}
    ]
})
