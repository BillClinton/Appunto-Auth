Ext.define('APPA.view.user.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_list',
    store   : 'APPA.store.Users',

    title   : 'Users',
    iconCls : 'user', 

	autoScroll	: true,

    viewConfig: {
        emptyText: 'No results found'
    },

    initComponent: function() {

        this.columns = [
            {header: 'Username', dataIndex: 'username', flex: 4},
            {header: 'Name',  dataIndex: 'name', flex: 3},
            {header: 'Last name',  dataIndex: 'surname', flex: 3},
            {header: 'Email',  dataIndex: 'email',   flex: 6},
			{
				header   : 'Active', 
				dataIndex: 'active',
				width    : 58, 
				sortable : true, 
				align    : 'center',
				renderer : function(val,meta,rec) {
					meta.tdCls = (rec.get('active') == 0) ? 'user-inactive' : 'user-active';
					return '';
				} 
			},
			{header: 'Last IP', dataIndex: 'last_ip', width: 100},
			{
				header		: 'last_login', 
				dataIndex	: 'last_login', 
				flex		: 4,
				renderer : function(val,metaData,record) {
/*
					if (val != '0000-00-00 00:00:00') 
					{
						return Ext.util.Format.date(val,APPUNTO.config.datetime_display);
					}
*/
					return 'never';
				}
			},{
				header		: 'Created', 
				dataIndex	: 'created', 
				hidden		: true,
				flex		: 1,
				xtype		: 'datecolumn' 
//				format		: APPUNTO.config.datetime_display
			},{
				header		: 'Modified', 
				dataIndex	: 'modified', 
				hidden		: true,
				flex		: 1,
				xtype		: 'datecolumn' 
//				format		: APPUNTO.config.datetime_display
			}
        ];

/*
        this.listeners = {
            'added'  : function(panel) {
                panel.getStore().load();
            }
        };

*/
		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Add User',
			action	: 'add',
			iconCls	: 'user-add' 
		}];

        this.callParent(arguments);
    }
});
