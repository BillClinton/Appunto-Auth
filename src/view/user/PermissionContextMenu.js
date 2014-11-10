Ext.define('AppuntoAuth.view.user.PermissionContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_permission_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('user_perm_add'),
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : Lang.localize('user_perm_remove'),
            action  : 'remove', 
            iconCls : 'lock-delete'
		}
    ]
})
