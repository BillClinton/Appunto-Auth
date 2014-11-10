Ext.define('AppuntoAuth.view.main.Frame' ,{
    extend  : 'Ext.tab.Panel',
    alias   : 'widget.appa-main-frame',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],


	/**
	 * Define the panel's items.
	 * @return void
	 */
    initComponent: function() 
	{
        this.items = 
		[
			{
				title	: Lang.localize('tab_status'),
				iconCls : 'transmit',
				itemId	: 'tab-status',
				xtype	: 'appa_status_view'
			//	xtype	: 'container'
			},
			{
				title	: Lang.localize('tab_users'),
				iconCls : 'user',
				itemId	: 'tab-users',
				xtype	: 'appa_user_frame'
			},
			{
				title	: Lang.localize('tab_user_roles'),
    			iconCls : 'shield', 
				itemId	: 'tab-roles',
				xtype	: 'appa_role_frame'
			},
			{
				title	: Lang.localize('tab_permissions'),
    			iconCls : 'lock', 
				itemId	: 'tab-permissions',
				xtype	: 'appa_permission_list'
			},
			{
				title	: Lang.localize('tab_paths'),
    			iconCls : 'map', 
				itemId	: 'tab-paths',
				xtype	: 'appa_path_frame'
			},
			{
				title	: Lang.localize('tab_sessions'),
    			iconCls : 'monitor', 
				itemId	: 'tab-sessions',
				xtype	: 'appa_session_list'
			}
		];

        this.callParent(arguments);
    }

});
