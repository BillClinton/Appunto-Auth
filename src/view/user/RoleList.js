Ext.define('AppuntoAuth.view.user.RoleList' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_role_list',
    store   : 'UserRoles',

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

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
            {header: Lang.localize('name'),  dataIndex: 'name', menuDisabled: true, flex: 1},
            {header: Lang.localize('description'),  dataIndex: 'description', menuDisabled: true, flex: 2}
        ];

		this.tbar = [
		{ 
			xtype 	: 'button',
			itemId	: 'role-view-toggle',
			text	: Lang.localize('user_role_view_all'),
			cls		: 'view-selection-button',
			menu	: [
			{
				text	: Lang.localize('user_role_view_all'),
				value	: '1',
				checked	: true,
				group	: 'role-view'
			},
			{
				text	: Lang.localize('user_role_view_selected'),
				value	: '0',
				checked	: false,
				group	: 'role-view'
			}]
		}];

        this.callParent(arguments);
    }
});
