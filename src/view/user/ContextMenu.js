Ext.define('AppuntoAuth.view.user.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_user_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('user_add'),
            action  : 'add', 
            iconCls : 'user-add'
        },
        {
            text    : Lang.localize('user_edit'),
            action  : 'edit', 
            iconCls : 'user-edit'
        },
        {
            text    : Lang.localize('user_delete'),
            action  : 'delete', 
            iconCls : 'user-delete'
        },
        {
            text    : Lang.localize('password_change'),
            action  : 'change_password', 
            iconCls : 'key'
        },
		{
            text    : Lang.localize('user_activate'),
			action  : 'activate',
			iconCls : 'accept'
        },
		{
            text    : Lang.localize('user_deactivate'),
			action  : 'deactivate',
			iconCls : 'delete'
		}
    ]
})
