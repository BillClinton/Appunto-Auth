Ext.define('AppuntoAuth.view.permission.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_permission_contextmenu',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('perm_add'),
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : Lang.localize('perm_edit'),
            action  : 'edit', 
            iconCls : 'lock-edit'
        },
        {
            text    : Lang.localize('perm_delete'),
            action  : 'delete', 
            iconCls : 'lock-delete'
		}
    ]
})
