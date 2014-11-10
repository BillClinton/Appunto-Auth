Ext.define('AppuntoAuth.view.user.PermissionList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_permission_list',
    store   : 'UserPermissions',

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

    title   : Lang.localize('user_perm_list'),
    iconCls : 'lock', 
	cls		: 'appunto-list',

	autoScroll	: true,
	border		: 0,

	viewConfig: {
		emptyText		: '<div class="empty"><p>'+Lang.localize('user_select_or')+'</p></div>',                    
		deferEmptyText	: false,
		loadMask 		: { msg : Lang.localize('loading') }
	},

    initComponent: function() {

        this.columns = [
			{
				header   : '', 
				dataIndex: 'hasPermission',
				hideable : false,
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
            {header: Lang.localize('name'),  dataIndex: 'name', menuDisabled: true, flex: 1},
			{
				text			: Lang.localize('granted_to'),
				menuDisabled	: true,
				id				: 'permission-granted-to-header',
				columns: [
				{
					header   : Lang.localize('grant_role'), 
					dataIndex: 'userRoleHasPermission',
					width    : 60, 
					sortable : true, 
					menuDisabled	: true,
					align    : 'center',
					renderer : function(val,meta,rec) {
						if (val == 1) 
						{
							meta.tdCls = 'user-role-has-permission';
							meta.tdAttr = 'data-qtip="' + Lang.localize('user_perm_granted_role') + '"';
						}
						return '';
					} 
				},
				{
					header   : Lang.localize('grant_user'), 
					dataIndex: 'userHasPermission',
					width    : 60, 
					sortable : true, 
					menuDisabled	: true,
					align    : 'center',
					renderer : function(val,meta,rec) {
						if (val == 1) 
						{
							meta.tdCls = 'user-has-permission';
							meta.tdAttr = 'data-qtip="' + Lang.localize('user_perm_granted_user') + '"';
						}
						return '';
					} 
				}]
			},
            {header: Lang.localize('description'),  dataIndex: 'description', menuDisabled: true, flex: 2}
        ];

		this.tbar = [
		{ 
			xtype 	: 'button',
			itemId	: 'permission-view-toggle',
			text	: Lang.localize('user_perm_view_all'),
			cls		: 'view-selection-button',
			menu	: [
			{
				text	: Lang.localize('user_perm_view_all'),
				value	: '1',
				checked	: true,
				group	: 'permission-view'
			},
			{
				text	: Lang.localize('user_perm_view_selected'),
				value	: '0',
				checked	: false,
				group	: 'permission-view'
			}]
		}];

        this.callParent(arguments);
    }
});
