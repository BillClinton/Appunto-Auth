Ext.define('AppuntoAuth.view.role.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_role_contextmenu',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('role_add'),
            action  : 'add', 
            iconCls : 'shield-add'
        },
        {
            text    : Lang.localize('role_edit'),
            action  : 'edit', 
            iconCls : 'shield-go'
        },
        {
            text    : Lang.localize('role_delete'),
            action  : 'delete', 
            iconCls : 'shield-delete'
		}
    ]
})
