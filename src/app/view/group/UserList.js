Ext.define('APPA.view.group.UserList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_group_user_list',
    store   : 'APPA.store.GroupUsers',
    //store   : 'GroupUsers',

    title   : 'Users',
    iconCls : 'lock', 
	cls		: 'appunto-list',

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>Select a Group or select <b>Show All</b> above.</p></div>',                    
		deferEmptyText	: false
	},


    initComponent: function() {

        this.columns = [
			{
				header   : '', 
				dataIndex: 'hasGroupUser',
				width    : 24, 
				sortable : true, 
				align    : 'center',
				renderer : function(val,meta,rec) {
					if (rec.get('inGroup') == 1) meta.tdCls = 'user-in-group';
					return '';
				} 
			},
            {header: 'Username',  dataIndex: 'username', width: 100},
            {header: 'Email',  dataIndex: 'email', flex: 1}
        ];

		this.tbar = [{ 
			xtype		: 'tbtext',
			text		: 'View:',
		},{
			xtype		: 'button', 
			text		: 'This group',
			toggleGroup	: 'user-view',
			action		: 'show_with_group',
		},{
			xtype		: 'button', 
			text		: 'Show All',
			toggleGroup	: 'user-view',
			pressed		: true,
			action		: 'show_all',
		}];

        this.callParent(arguments);
    }
});
