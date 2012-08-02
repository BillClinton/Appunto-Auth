Ext.define('APPA.view.info.MainPanel' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_info_main_panel',

	title		: 'License',
	iconCls 	: 'open-source',

	layout		: 'fit',
	border		: 0,
	autoScroll	: true,
	bodyStyle 	: 'padding:24px;',

	autoLoad	: ci_site_url+'/appunto-auth/info/main'

});
