/**
 * Main Application Viewport.
 *
 * The viewport is being defined outside of the app.js so that the application
 * can use either a Viewport or be included in a div as a panel.
 */
Ext.define('APPA.view.main.Viewport' ,{
    extend  : 'Ext.container.Viewport',
    alias   : 'widget.appa_main_viewport',

	layout: 'border',

	items: [
		{
			// header area
			xtype		: 'container',
//			id			: 'app-header',
			cls			: 'app-header',
			contentEl	: 'login-header',  // this div must be in the view or an error will occur
			region		: 'north',
			height		: 64,
			border		:  0
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
					xtype		: 'panel',
					layout		: 'card',
					itemId		: 'mainPanel',
					border		: 0,
					activeItem	: 0,
					items		: [
						{
							xtype		: 'appa_main_frame',
							cls			: 'app-main-panel',
						},
						{
							xtype		: 'container',
//									xtype		: 'appa_settings_frame',
							cls			: 'app-main-panel',
						}
					]
				}
			]
		}
	]
});

