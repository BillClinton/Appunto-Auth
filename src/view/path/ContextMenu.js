Ext.define('AppuntoAuth.view.path.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_path_contextmenu',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('path_set_private'),
            action  : 'set_private', 
            iconCls : 'page-delete'
        },
        {
            text    : Lang.localize('path_set_public'),
            action  : 'set_public', 
            iconCls : 'world-link'
        },
        {
            text    : Lang.localize('path_set_permission'),
			action	: 'set_permission',
			itemId	: 'permission-options',
            iconCls : 'lock',
			menu	: [
				'<span class="menu-title">'+Lang.localize('path_permissions')+'</span>'
			]
		},
        {
            text    : Lang.localize('path_remove_permission'),
            action  : 'remove_permission', 
            iconCls : 'lock-delete'
		},
        {
            text    : Lang.localize('path_delete'),
            action  : 'delete', 
			iconCls : 'delete'
        }
    ]
})
