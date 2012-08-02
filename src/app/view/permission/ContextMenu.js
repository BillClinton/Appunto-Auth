Ext.define('APPA.view.permission.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_permission_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add permission',
            action  : 'add', 
            iconCls : 'lock-add'
        },
        {
            text    : 'Edit permission',
            action  : 'edit', 
            iconCls : 'lock-edit'
        },
        {
            text    : 'Delete permission',
            action  : 'delete', 
            iconCls : 'lock-delete'
		}
    ]
})
