Ext.define('APPA.view.role.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_role_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add role',
            action  : 'add', 
            iconCls : 'shield-add'
        },
        {
            text    : 'Edit role',
            action  : 'edit', 
            iconCls : 'shield-go'
        },
        {
            text    : 'Delete role',
            action  : 'delete', 
            iconCls : 'shield-delete'
		}
    ]
})
