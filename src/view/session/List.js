Ext.define('AppuntoAuth.view.session.List' ,
{
    extend  	: 'Ext.grid.Panel',
    alias   	: 'widget.appa_session_list',
    store   	: 'Sessions',

	requires	: [
		'AppuntoAuth.lib.lang.Default',
		'AppuntoAuth.view.session.ListController'
	],

	controller	: 'session-list',

	autoScroll	: true,

    viewConfig: {
		loadMask : { msg : Lang.localize('loading') }
    },

	columns : [
		{
			header   : Lang.localize('session_username'), 
			flex	 : 3,
			sortable : true, 
			dataIndex: 'username'
		},
		{
			header   : Lang.localize('session_last_activity'), 
			flex	 : 3,
			sortable : true, 
			renderer : function(val,metaData,record) {
				// empty dates return an empty string for date.format('y')
				return (Ext.util.Format.date(val,'y')) ? Ext.util.Format.date(val,'M d, Y h:i:s A') : 'unknown';
			},
			dataIndex: 'last_activity'
		},
		{
			header   : Lang.localize('session_last_page'), 
			flex	 : 3,
			sortable : true, 
			dataIndex: 'last_page'
		},
		{
			header   : Lang.localize('session_ip_address'), 
			flex	 : 2,
			sortable : true, 
			dataIndex: 'ip_address'
		},
		{
			header   : Lang.localize('session_user_agent'), 
			flex	 : 8,
			sortable : true, 
			dataIndex: 'user_agent'
		}
	],

	tbar : [
	{ 
		xtype 	: 'button',
		itemId	: 'session-view-toggle',
		text	: Lang.localize('session_view_all'),
		cls		: 'view-selection-button',
		menu	: [
		{
			text	: Lang.localize('session_view_all'),
			value	: '1',
			checked	: true,
			handler	: 'toggleView',
			group	: 'session-view'
		},
		{
			text	: Lang.localize('session_view_logged_in'),
			value	: '0',
			checked	: false,
			handler	: 'toggleView',
			group	: 'session-view'
		}]
	}],

	bbar : [{ 
		xtype	: 'button', 
		text	: Lang.localize('refresh'),
		iconCls	: 'x-tbar-loading',
		handler	: 'refreshList'
	}],

    initComponent: function() {

        this.callParent(arguments);

        this.addListener('activate', this.getController().refreshList);
        this.addListener('itemcontextmenu', this.getController().showContextMenu);
        this.addListener('containercontextmenu', function(view, e) { e.preventDefault(); } );
        this.addListener('contextmenu', function(view, e) { e.preventDefault(); } );
    }

});
