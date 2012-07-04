Ext.define('APPA.view.settings.Frame' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_settings_frame',

	layout	: 'border',

	defaults: {
		collapsible: false
		//split: true
	},

	border	: 0,

    initComponent: function() 
	{
        this.items = 
		[
			{
				xtype	: 'appa_settings_menu',
				region	: 'west',
				minWidth: 40,
				width	: 160
			},{
				xtype	: 'panel',
				itemId  : 'settingsCardPanel',
				layout	: 'card',
				region	: 'center',
				minWidth: 240,
				border	: 0,
				flex	: 1,
				activeItem	: 0,
				items	: [
					{
						xtype	: 'appa_settings_info'
					}
				]
			}
		];
        this.callParent(arguments);
    }
});
