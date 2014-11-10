Ext.define('AppuntoAuth.view.main.Login', 
{
    extend  	: 'Ext.container.Container',
    alias   	: 'widget.appa-main-login',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	autoScroll	: true,
    title   	: Lang.localize('perm_add'),
    iconCls 	: 'lock-add',
    layout  	: 'fit',
    autoShow	: true,
    modal   	: true,

	items 		: [
		{
			xtype: 'form',
			baseCls: 'x-plain',
			border: false,
			layout: {
                type: 'hbox',
                align: 'stretch'
            },
			bodyStyle: {
				padding : '10px'
			},
/*
			defaults: {
				width		: 180,
				labelWidth	: 60
			},
*/
			items: [
				{
					name        : 'username',
					fieldLabel	: Lang.localize('username'),
					labelCls	: 'admin-login-label',
					labelAlign	: 'right',
					xtype       : 'textfield',
					value		: ''		// initialzing field so changes will show it as dirty
				},
				{
					name        : 'password',
					fieldLabel	: Lang.localize('password'),
					labelCls	: 'admin-login-label',
					labelAlign	: 'right',
					xtype       : 'textfield',
					value		: ''		// initialzing field so changes will show it as dirty
				},
				{
					xtype		: 'button',
					text		: Lang.localize('login'),
					cls			: 'admin-login-button',
					action		: 'login'
				}
			]
		}
	]

});
