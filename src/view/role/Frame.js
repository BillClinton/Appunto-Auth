Ext.define('AppuntoAuth.view.role.Frame' ,{
    extend  : 'Ext.container.Container',
    alias   : 'widget.appa_role_frame',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	layout	: {
		type	: 'hbox',
		align	: 'stretch'
	},

	defaults: {
		collapsible: false
	},

	border	: 0,

	items	: [
		{
			xtype		: 'appa_role_list',
			flex		: 1,
			border		: "0 1px 0 0",
			minWidth	: 120
		},{
			xtype		: 'appa_role_permission_list',
			border		: "1px 0 0 1px",
			flex		: 1
		}
	]

});
