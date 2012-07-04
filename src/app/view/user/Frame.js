Ext.define('APPA.view.user.Frame' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_user_frame',

	layout	: {
		type	: 'vbox',
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
				xtype		: 'appa_user_list',
				flex		: 1,
				minHeight	: 120
			},{
				xtype		: 'panel',
				flex		: 1,
				minHeight	: 120,
				layout		: {
					type	: 'hbox',
					align	: 'stretch'
				},
				//border	: 0,
				items	: [
					{
						xtype	: 'appa_user_role_list',
						flex	: 1
					},
					{
						xtype	: 'appa_user_permission_list',
						flex	: 1
					}
				],
        		bbar	: {
					xtype		: 'pagingtoolbar',
            		store		: 'Users',       
            		displayInfo	: true
				}
			}
		];
        this.callParent(arguments);
    }
});
