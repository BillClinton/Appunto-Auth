Ext.define('APPA.view.info.StatusPanel' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_info_status_panel',

	title	: 'Application Status',
	iconCls : 'information',

	layout		: 'fit',
	border		: 0,
	autoScroll	: true,
	bodyStyle 	: 'padding:24px;',
	
	autoLoad	: ci_site_url+'/appunto-auth/info/status'

});
