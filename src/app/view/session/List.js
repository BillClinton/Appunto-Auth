Ext.define('APPA.view.session.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_session_list',
    store   : 'APPA.store.Sessions',

    title   : 'Sessions',
    iconCls : 'monitor', 

	autoScroll	: true,

    initComponent: function() {

        this.columns = [
			{
				header   : 'User Name', 
				width    : 96, 
				sortable : true, 
				dataIndex: 'username'
			},
			{
				header   : 'Last Activity', 
				width    : 160, 
				sortable : true, 
				renderer : function(val,metaData,record) {
					// empty dates return an empty string for date.format('y')
					return (Ext.util.Format.date(val,'y')) ? Ext.util.Format.date(val,'M d, Y h:i:s A') : 'unknown';
				},
				dataIndex: 'last_activity'
			},
			{
				header   : 'IP Address', 
				width    : 120, 
				sortable : true, 
				dataIndex: 'ip_address'
			},
			{
				header   : 'User Agent', 
				flex	 : 1,
				sortable : true, 
				dataIndex: 'user_agent'
			}
        ];

		this.tbar = [{ 
			xtype		: 'tbtext',
			text		: 'View:',
		},{
			xtype		: 'button', 
			text		: 'Logged in',
			toggleGroup	: 'view',
			action		: 'show_logged_in',
		},{
			xtype		: 'button', 
			text		: 'All',
			toggleGroup	: 'view',
			pressed		: true,
			action		: 'show_all',
		}];

		this.bbar = [{ 
			xtype	: 'button', 
			text	: '',
			action	: 'refresh',
			iconCls	: 'x-tbar-loading' 
		}];

        this.callParent(arguments);
    }
});
