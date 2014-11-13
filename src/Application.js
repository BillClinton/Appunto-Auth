/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.require('AppuntoAuth.lib.proxy.Codeigniter');
Ext.require('AppuntoAuth.lib.util.CustomVTypes');
Ext.require('AppuntoAuth.lib.util.FakeConsole');
Ext.require('AppuntoAuth.lib.util.SearchField');
Ext.require('AppuntoAuth.lib.util.KeepAlive');
Ext.require('AppuntoAuth.lib.lang.Default');

Ext.ClassManager.addNameAliasMappings({
	'AppuntoAuth.lib.proxy.Codeigniter': ['proxy.ci']
});

Ext.define('AppuntoAuth.Application', {
    extend: 'Ext.app.Application',
    
    name: 'AppuntoAuth',

	enableQuickTips : true,

    controllers: [
		'Navigation',
		'Status',
		'Users',
		'Roles',
		'Permissions',
		'Paths',
		'Sessions'
    ],

    launch: function () 
	{
		Ext.tip.QuickTipManager.init();
		AppuntoAuth.lib.util.CustomVTypes.apply();
		AppuntoAuth.lib.util.FakeConsole.init();
		AppuntoAuth.lib.lang.Default.init();

		AppuntoAuth.lib.util.KeepAlive.init(admin_keepalive);
    }
});
