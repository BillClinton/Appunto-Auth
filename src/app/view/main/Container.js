/**
 * Main Application container.
 *
 * This container is being defined outside of the app.js so that the application
 * can use either a Viewport or be included in a div as a panel.
 */
Ext.define('APPA.view.main.Container' ,{
    extend  : 'Ext.container.Container',
    alias   : 'widget.appa_main_container',

	layout	: 'fit',
	renderTo: 'appunto-auth-app-div',
	width	: '100%',

	items: [
		{
			xtype		: 'container',
			cls			: 'app-main',
			region		: 'center',
			layout		: 'fit',
			flex		: 5,
			border		: 0,
			items		: [
				{
					xtype		: 'appa_main_frame',
					cls			: 'app-main-panel'
				}
			]
		}
	]
});

