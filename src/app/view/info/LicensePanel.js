Ext.define('APPA.view.info.LicensePanel' ,{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.appa_info_license_panel',

	title		: 'License',
	iconCls 	: 'open-source',

	layout		: 'fit',
	border		: 0,
	autoScroll	: true,
	bodyStyle 	: 'padding:24px;',

	autoLoad	: '/auth/index.php/appunto/info/license'

});
