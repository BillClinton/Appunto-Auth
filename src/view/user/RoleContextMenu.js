Ext.define('AppuntoAuth.view.user.RoleContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_role_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('user_role_add'),
            action  : 'add', 
            iconCls : 'shield-add'
        },
        {
            text    : Lang.localize('user_role_remove'),
            action  : 'remove', 
            iconCls : 'shield-delete'
		}
    ]
})
