Ext.define('AppuntoAuth.view.role.PermissionContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_role_permission_contextmenu',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('role_perm_add'),
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : Lang.localize('role_perm_remove'),
            action  : 'remove', 
            iconCls : 'lock-delete'
		}
    ]
})
