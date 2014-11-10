Ext.define('AppuntoAuth.controller.Sessions', {
    extend: 'Ext.app.Controller',

	models: [
		'Session'
	],

	stores : [
		'Sessions'
	],

    views: [
		'session.List',
		'session.ContextMenu'
    ]

});
