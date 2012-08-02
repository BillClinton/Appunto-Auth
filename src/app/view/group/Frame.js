Ext.define('APPA.view.group.Frame' ,{
    extend  : 'Ext.container.Container',
    alias   : 'widget.appa_group_frame',

	layout	: {
		type	: 'hbox',
		align	: 'stretch'
	},

	defaults: {
		collapsible: false
	},

	border	: 0,

	createMenuItem: true,

    initComponent: function() 
	{
        this.items = 
		[
			{
				xtype		: 'appa_group_list',
				flex		: 1,
				minWidth	: 120
			},{
				xtype		: 'appa_group_user_list',
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
