Ext.define('AppuntoAuth.view.session.ContextMenu' ,{
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.appa_session_contextmenu',

	requires	: 'AppuntoAuth.view.session.ListController',
	controller	: 'session-list',

	config	: {
		record	: null
	},

    items : [
        {
            text    : Lang.localize('session_delete'),
			handler	: 'confirmSessionDeletion',
            iconCls : 'monitor-delete'
		}
    ]
})
