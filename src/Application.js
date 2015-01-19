/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('AppuntoAuth.Application', 
{
    extend: 'Ext.app.Application',

    requires: [
        'AppuntoAuth.lib.util.FakeConsole',
        'AppuntoAuth.lib.util.CustomVTypes',
        'AppuntoAuth.lib.util.SearchField',
        'AppuntoAuth.lib.util.KeepAlive',
        'AppuntoAuth.lib.lang.Default'
    ],
    
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
    ]

});
