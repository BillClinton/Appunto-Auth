Ext.define('APPA.view.info.ApplicationPanel' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_info_application_panel',

	title	: 'Application',
	iconCls : 'application_side_tree',

	layout		: 'fit',
	border		: 0,
	autoScroll	: true,
	bodyStyle 	: 'padding:24px;',
	
	autoLoad	: ci_site_url+'/appunto-auth/info/application'

});
