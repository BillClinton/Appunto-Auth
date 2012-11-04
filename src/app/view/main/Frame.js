/**
 * Main Application Frame.
 *
 *
 * This frame holds all application elements.  It uses a border layout with the 
 * {@link APPA.view.main.Menu} in the west pane.  The center
 * pane contains a panel with a card layout that contains all the individual
 * application sections (Users, Roles, Permissions, etc.) 
 */
Ext.define('APPA.view.main.Frame' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_main_frame',

	layout	: 'border',

	defaults: {
		collapsible: false
	},

	border	: 0,

	/**
	 * Define the panel's items.
	 * @return void
	 */
    initComponent: function() 
	{
        this.items = 
		[
			{
				xtype	: 'appa_main_menu',
				region	: 'west',
				minWidth: 40,
				width	: 120
			},{
				xtype	: 'panel',
				itemId  : 'frameCardPanel',
				layout	: 'card',
				region	: 'center',
				minWidth: 240,
				border	: 0,
				flex	: 1,
				activeItem	: 0,
				items	: [
					{
						xtype	: 'panel',
						layout	: { type: 'hbox', align:'stretch'},
						items	: [
						{
							xtype	: 'appa_info_status_panel',
							flex	: 1
						},
						{
							xtype	: 'appa_user_logins_widget',
							flex	: 1
						}]
					},
					{
						xtype	: 'appa_user_frame'
					},
					{
						xtype	: 'appa_group_frame'
					},
					{
						xtype	: 'appa_role_frame'
					},
					{
						xtype	: 'appa_permission_list'
					},
					{
						xtype	: 'appa_path_list'
					},
					{
						xtype	: 'appa_session_list'
					},
					{
						xtype	: 'appa_info_main_panel'
					},
					{
						xtype	: 'appa_info_application_panel'
					},
					{
						xtype	: 'appa_info_credits_panel'
					},
					{
						xtype	: 'appa_info_license_panel'
					}
				]
			}
		];
        this.callParent(arguments);
    }
});
