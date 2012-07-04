Ext.define('APPA.view.session.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_session_contextmenu',

	config	: {
		record	: null
	},

    items : [
        {
            text    : 'Delete session',
            action  : 'delete', 
            iconCls : 'monitor-delete'
		}
    ]
})
