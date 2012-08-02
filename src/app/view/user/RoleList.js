Ext.define('APPA.view.user.RoleList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_role_list',
    store   : 'APPA.store.UserRoles',

    title   : 'Roles',
    iconCls : 'shield', 
	cls		: 'appunto-list',

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>Select a User or select <b>Show All</b> above.</p></div>',                    
		deferEmptyText	: false
	},

    initComponent: function() {

        this.columns = [
			{
				header   		: '', 
				dataIndex		: 'hasRole',
				width    		: 24, 
				sortable 		: true, 
				menuDisabled	: true,
				align    		: 'center',
				renderer 		: function(val,meta,rec) {
					if (rec.get('hasRole') == 1) meta.tdCls = 'user-has-role';
					return '';
				} 
			},
            {header: 'Name',  dataIndex: 'name', menuDisabled: true, width: 100},
            {header: 'Description',  dataIndex: 'description', menuDisabled: true, flex: 1}
        ];

		this.tbar = [{ 
			xtype		: 'tbtext',
			text		: 'View:',
		},{
			xtype		: 'button', 
			text		: 'This User',
			toggleGroup	: 'role-view',
			action		: 'show_with_role',
		},{
			xtype		: 'button', 
			text		: 'Show all',
			toggleGroup	: 'role-view',
			pressed		: true,
			action		: 'show_all',
		}];

        this.callParent(arguments);
    }
});
