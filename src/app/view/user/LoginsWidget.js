Ext.define('APPA.view.user.LoginsWidget' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_logins_widget',
    store   : 'APPA.store.Logins',

    title   : 'Recent Login Attempts',
    iconCls : 'shield', 

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>no recent login attempts found</div>',                    
		deferEmptyText	: false
	},

    initComponent: function() {

        this.columns = [
			{
				header   		: '', 
				dataIndex		: 'success',
				width    		: 24, 
				sortable 		: true, 
				menuDisabled	: true,
				align    		: 'center',
				renderer 		: function(val,meta,rec) {
					if (rec.get('success') == 1) {
						meta.tdCls = 'login-success';
						meta.tdAttr = 'data-qtip="'+rec.get('note')+'"';
					}
					else if (rec.get('success') == 0) {
						meta.tdCls = 'login-fail';
						meta.tdAttr = 'data-qtip="'+rec.get('note')+'"';
					}
					else {
						meta.tdCls = 'login-failure';
						meta.tdAttr = 'data-qtip="'+rec.get('note')+'"';
					}
					return '';
				} 
			},
            {header: 'Date',  dataIndex: 'attempt_time', width: 80, align:'right', xtype:'datecolumn', format:'m/d/Y'},
            {header: 'Time',  dataIndex: 'attempt_time', width: 60, align:'right', xtype:'datecolumn', format:'H:i:s'},
            {header: 'Username',  dataIndex: 'username', menuDisabled: true, flex: 1},
            {header: 'IP Address',  dataIndex: 'ip_address', menuDisabled: true, flex: 1}
        ];

		this.tools = [
			{
				type	: 'refresh',
				itemId	: 'refresh'
			}
		];

        this.callParent(arguments);
    }
});
