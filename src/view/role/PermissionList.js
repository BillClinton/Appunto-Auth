Ext.define('AppuntoAuth.view.role.PermissionList' ,
{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_role_permission_list',
    store   : 'RolePermissions',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

    title   : Lang.localize('tab_permissions'),
    iconCls : 'lock', 
	cls		: 'appunto-list',

	autoScroll	: true,

	viewConfig: {
		emptyText		: '<div class="empty"><p>'+Lang.localize('role_select')+'</p></div>',                    
		deferEmptyText	: false,
		loadMask 		: { msg : Lang.localize('loading') }
	},


	columns : [
		{
			header   : '', 
			dataIndex: 'hasRolePermission',
			hideable : false,
			width    : 24, 
			sortable : true, 
			align    : 'center',
			renderer : function(val,meta,rec) {
				if (rec.get('inRole') == 1) meta.tdCls = 'permission-in-role';
				return '';
			} 
		},
		{header: Lang.localize('name'),  dataIndex: 'name', hideable : false, flex: 1},
		{header: Lang.localize('description'),  dataIndex: 'description', hideable : false, flex: 2}
	],

	tbar : [{ 
		xtype 	: 'button',
		itemId	: 'permission-view-toggle',
		text	: Lang.localize('role_perm_view_all'),
		cls		: 'view-selection-button',
		menu	: [
		{
			text	: Lang.localize('role_perm_view_all'),
			value	: '1',
			checked	: true,
			group	: 'permission-view'
		},
		{
			text	: Lang.localize('role_perm_view_selected'),
			value	: '0',
			checked	: false,
			group	: 'permission-view'
		}]
	}]

});
