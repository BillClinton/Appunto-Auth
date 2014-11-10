/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('AppuntoAuth.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'appa-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
	{
		// header area
		xtype		: 'container',
		cls			: 'app-header',
		region		: 'north',
		height		: 64,
		border		:  0,
		layout		: {
			type	: 'hbox',
			pack	: 'end'
		},
		items		: {
			xtype	: 'button',
			text	: 'logout',
			action	: 'logout',
			cls		: 'admin-logout-button'
		}	
	},
	{
		xtype		: 'panel',
		cls			: 'app-main',
		region		: 'center',
		layout		: 'fit',
		flex		: 5,
		border		:  0,
		items		: [
			{
	//			xtype		: 'container'
				xtype		: 'appa-main-frame'
			}
		]
    }]
});
