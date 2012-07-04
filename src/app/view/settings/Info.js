Ext.define('APPA.view.settings.Info' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_settings_info',

	title	: 'Application Information',
	iconCls	: 'information-title', 

	layout	: 'fit',
	
	bodyStyle 	: 'padding:36px;',

    initComponent: function() 
	{
		this.html = 'Ext version: '+ Ext.getVersion();

        this.callParent(arguments);
    }
});
