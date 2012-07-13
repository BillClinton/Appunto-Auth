Ext.define('APPA.view.group.UserContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_group_user_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Add user to group',
            action  : 'add', 
            iconCls : 'user-add'
        },
        {
            text    : 'Remove user from group',
            action  : 'remove', 
            iconCls : 'user-delete'
		}
    ]
})
