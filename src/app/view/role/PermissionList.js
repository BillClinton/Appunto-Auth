Ext.define('APPA.view.role.PermissionList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_role_permission_list',
    store   : 'APPA.store.RolePermissions',

    title   : 'Permissions',
    iconCls : 'lock', 
	cls		: 'appunto-list',

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>Select a Role or select <b>Show All</b> above.</p></div>',                    
		deferEmptyText	: false
	},


    initComponent: function() {

        this.columns = [
			{
				header   : '', 
				dataIndex: 'hasRolePermission',
				width    : 24, 
				sortable : true, 
				align    : 'center',
				renderer : function(val,meta,rec) {
					if (rec.get('inRole') == 1) meta.tdCls = 'permission-in-role';
					return '';
				} 
			},
            {header: 'Name',  dataIndex: 'name', width: 100},
            {header: 'Description',  dataIndex: 'description', flex: 1}
        ];

		this.tbar = [{ 
			xtype		: 'tbtext',
			text		: 'View:',
		},{
			xtype		: 'button', 
			text		: 'This role',
			toggleGroup	: 'permission-view',
			action		: 'show_with_role',
		},{
			xtype		: 'button', 
			text		: 'Show All',
			toggleGroup	: 'permission-view',
			pressed		: true,
			action		: 'show_all',
		}];

        this.callParent(arguments);
    }
});
