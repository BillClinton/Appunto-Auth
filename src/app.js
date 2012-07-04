//Ext.Loader.setPath('Ext', 'http://cdn.sencha.io/ext-4.0.7-gpl/src');
//Ext.Loader.setPath('Ext', 'http://extjs.cachefly.net/ext-4.0.7-gpl/src');
Ext.Loader.setPath('Ext', 'extjs/src');

Ext.require('Ext.container.Viewport');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.form.Panel');
Ext.require('Ext.form.field.Checkbox');
Ext.require('Ext.grid.column.Date');
Ext.require('Ext.grid.feature.Grouping');
Ext.require('Ext.grid.plugin.CellEditing');
Ext.require('Ext.layout.container.Border');
Ext.require('Ext.layout.container.Card');
Ext.require('Ext.toolbar.Paging');
Ext.require('Ext.toolbar.TextItem');
Ext.require('Ext.window.MessageBox');

// Require proxy
Ext.Loader.setPath('APPUNTO.lib', 'resources/appunto-auth/lib');
Ext.require('APPUNTO.lib.proxy.Codeigniter');
Ext.ClassManager.setAlias('APPUNTO.lib.proxy.Codeigniter', 'proxy.ci');

Ext.application({
    name: 'APPA',

    controllers: [
		'Main',
		'Users',
		'Settings',
		'Roles',
		'Permissions',
		'Paths',
		'Sessions',
		'Info'
    ],

    launch: function() 
	{
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
				{
					// header area
					xtype		: 'container',
					cls			: 'app-header',
					applyTo		: 'app-user',
					region		: 'north',
					height		: 60,
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

		setTimeout(function(){
			Ext.get('loading').remove();
			Ext.get('loading-mask').fadeOut({remove:true});
		}, 250);
    }
});
