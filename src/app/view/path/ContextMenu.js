Ext.define('APPA.view.path.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_path_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Make path private',
            action  : 'set_private', 
            iconCls : 'page-delete'
        },
        {
            text    : 'Make path public',
            action  : 'set_public', 
            iconCls : 'world-link'
        },
        {
            text    : 'Set permission',
            action  : 'set_permission', 
            iconCls : 'lock'
		},
        {
            text    : 'Remove permission',
            action  : 'remove_permission', 
            iconCls : 'lock-delete'
		},
        {
            text    : 'Delete Path',
            action  : 'delete', 
			iconCls : 'delete'
        }
    ]
})
