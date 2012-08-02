Ext.define('APPA.view.user.PermissionList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_permission_list',
    store   : 'APPA.store.UserPermissions',

    title   : 'Permissions',
    iconCls : 'lock', 
	cls		: 'appunto-list',

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>Select a User or select <b>Show All</b> above.</p></div>',                    
		deferEmptyText	: false
	},

    initComponent: function() {

        this.columns = [
			{
				header   : '', 
				dataIndex: 'hasPermission',
				width    : 24, 
				sortable : true, 
				menuDisabled	: true,
				align    : 'center',
				renderer : function(val,meta,rec) {
					if (val == 1) 
					{
						meta.tdCls = 'has-permission';
					}
					return '';
				} 
			},
			{
				header   : '', 
				dataIndex: 'userRoleHasPermission',
				width    : 24, 
				sortable : true, 
				menuDisabled	: true,
				align    : 'center',
				renderer : function(val,meta,rec) {
					if (val == 1) 
					{
						meta.tdCls = 'user-role-has-permission';
						meta.tdAttr = 'data-qtip="permission granted through role"';
					}
					return '';
				} 
			},
			{
				header   : '', 
				dataIndex: 'userHasPermission',
				width    : 24, 
				sortable : true, 
				menuDisabled	: true,
				align    : 'center',
				renderer : function(val,meta,rec) {
					if (val == 1) 
					{
						meta.tdCls = 'user-has-permission';
						meta.tdAttr = 'data-qtip="permission granted to user"';
					}
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
			text		: 'This user',
			toggleGroup	: 'user-permission-view',
			action		: 'show_user',
		},{
			xtype		: 'button', 
			text		: 'Show All',
			toggleGroup	: 'user-permission-view',
			pressed		: true,
			action		: 'show_all',
		}];

        this.callParent(arguments);
    }
});
