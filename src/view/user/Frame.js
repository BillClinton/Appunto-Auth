Ext.define('AppuntoAuth.view.user.Frame',
{
    extend  	: 'Ext.container.Container',
    alias   	: 'widget.appa_user_frame',

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

//	autoScroll	: false,


	layout	: {
		type	: 'border'
//		align	: 'stretch'
	},

	bodyBorder: false,

	defaults: {
		collapsible	: false
//		split		: true
	},

	border	: 0,

	createMenuItem: true,

	items : 
	[
		{
			xtype		: 'appa_user_list',
			region		: 'center',
			flex		: 1
		},{
			xtype				: 'panel',
			title   			: Lang.localize('user_role_list'),
			itemId				: 'role-permission-frame',
			hideCollapseTool	: true,
			iconCls 			: 'shield', 
			region				: 'east',
			collapsible			: true,
			flex				: 1,
			border				: "1px 0 0 1px",
			layout		: {
				type	: 'vbox',
				align	: 'stretch'
			},
			items	: [
				{
					xtype	: 'appa_user_role_list',
					flex	: 1
				},
				{
					title	: 'Permission List',
					xtype	: 'appa_user_permission_list',
					flex	: 1
				}
			]
		}
	]
});
