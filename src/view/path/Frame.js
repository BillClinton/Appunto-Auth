Ext.define('AppuntoAuth.view.path.Frame' ,
{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_path_frame',

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

	createMenuItem: true,

    items : 
	[
		{
			xtype		: 'panel',
			title		: Lang.localize('path_tab_controllers'),
			cls			: 'controller-frame',
			autoScroll	: true,
			items		: [{xtype:'appa_path_controller_view'}],
			border		: 0,
			flex		: 6
		},
		{
			xtype		: 'panel',
			title		: Lang.localize('path_tab_paths'),
			layout		: 'fit',
			items		: [{xtype:'appa_path_path_view'}],
			border		: 0,
			flex		: 10
		}
	],

	bbar : [
		{ 
			type	: 'button', 
			text	: Lang.localize('refresh'),
			action	: 'verify-paths',
			iconCls	: 'x-tbar-loading' 
		}
	],


    initComponent: function() 
	{
        this.callParent(arguments);
    }
});
