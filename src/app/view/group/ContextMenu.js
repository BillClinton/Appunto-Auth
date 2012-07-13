Ext.define('APPA.view.group.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_group_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add group',
            action  : 'add', 
            iconCls : 'group-add'
        },
        {
            text    : 'Edit group',
            action  : 'edit', 
            iconCls : 'group-edit'
        },
        {
            text    : 'Delete group',
            action  : 'delete', 
            iconCls : 'group-delete'
		}
    ]
})
