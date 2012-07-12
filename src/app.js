Ext.Loader.setPath('Ext', 'http://cdn.sencha.io/ext-4.0.7-gpl/src');
//Ext.Loader.setPath('Ext', 'http://extjs.cachefly.net/ext-4.0.7-gpl/src');
//Ext.Loader.setPath('Ext', 'extjs/src');

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
//Ext.Loader.setPath('APPUNTO.lib', 'resources/appunto-auth/lib');  // need this for build/deploy
Ext.Loader.setPath('APPUNTO.lib', '/auth/resources/appunto-auth/lib'); // need this for testing src version locally 
Ext.require('APPUNTO.lib.proxy.Codeigniter');
Ext.ClassManager.setAlias('APPUNTO.lib.proxy.Codeigniter', 'proxy.ci');



Ext.application({
    name: 'APPA',

	// Add path for testing src version - comment this out when building/deploying
	appFolder: '/auth/app',

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
		var container;

		if (appunto_auth_display_type == "viewport")
		{
			Ext.create('APPA.view.main.Viewport').render();
		}
		else if (appunto_auth_display_type == "container")
		{
			container = Ext.create('APPA.view.main.Container');
			Ext.EventManager.onWindowResize(container.doLayout, container);
		} 
		else
		{
			alert('no display type defined!');
		}

		setTimeout(function(){
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({remove:true});
		}, 250);

    }
});
