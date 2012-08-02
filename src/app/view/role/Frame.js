Ext.define('APPA.view.role.Frame' ,{
    extend  : 'Ext.container.Container',
    alias   : 'widget.appa_role_frame',

	layout	: {
		type	: 'hbox',
		align	: 'stretch'
	},

	defaults: {
		collapsible: false
	},

	border	: 0,

    initComponent: function() 
	{
        this.items = 
		[
			{
				xtype		: 'appa_role_list',
				flex		: 1,
				minWidth	: 120
			},{
				xtype		: 'appa_role_permission_list',
				flex		: 1
			}
		];

		this.bbar	= [{
			xtype	: 'button', 
			text	: '',
			action	: 'refresh',
			iconCls	: 'x-tbar-loading' 
		}];

        this.callParent(arguments);
    }
});
