Ext.define('APPA.view.info.CreditsPanel' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_info_credits_panel',

	title		: 'Credits',
	iconCls 	: 'trophy',

	layout		: 'fit',
	border		: 0,
	autoScroll	: true,
	bodyStyle 	: 'padding:24px;',
	
	autoLoad	: ci_site_url+'/appunto-auth/info/credits'

});
