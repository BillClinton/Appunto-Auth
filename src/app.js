//Ext.Loader.setPath('Ext', 'http://cdn.sencha.com/ext-4.1.1-gpl/src');
//Ext.Loader.setPath('Ext', 'http://cdn.sencha.io/ext-4.0.7-gpl/src');
//Ext.Loader.setPath('Ext', 'http://extjs.cachefly.net/ext-4.0.7-gpl/src');
//Ext.Loader.setPath('Ext', '/auth/extjs/src');

// This one needed for building
//Ext.Loader.setPath('Ext', 'extjs/src');

// This one needed for working with src
Ext.Loader.setPath('Ext', '/lib/ext-4.1.1a/src');


Ext.require('Ext.container.Viewport');
Ext.require('Ext.data.TreeStore');
Ext.require('Ext.form.Panel');
Ext.require('Ext.form.field.Checkbox');
Ext.require('Ext.form.field.ComboBox');
Ext.require('Ext.grid.column.Date');

/**
 * Override grouping here, override from 
 * http://www.sencha.com/forum/showthread.php?143617-Grids-CollapseAllGroups-amp-ExpandAllGroups&p=651791&viewfull=1#post651791
 */
Ext.require('Ext.grid.feature.Grouping');
Ext.require('Ext.grid.plugin.CellEditing');
Ext.require('Ext.layout.container.Border');
Ext.require('Ext.layout.container.Card');
Ext.require('Ext.toolbar.Paging');
Ext.require('Ext.toolbar.Spacer');
Ext.require('Ext.toolbar.TextItem');
Ext.require('Ext.window.MessageBox');

// Require proxy 
Ext.Loader.setPath('APPUNTO.lib', '/auth/resources/appunto/lib'); // need this for testing src version locally 
//Ext.Loader.setPath('APPUNTO.lib', '../appunto/lib');  // need this for build/deploy
// needs fixin? Ext.Loader.setPath('APPUNTO.lib', '/appunto/lib'); // need this for testing src version locally 
Ext.require('APPUNTO.lib.proxy.Codeigniter');
Ext.ClassManager.setAlias('APPUNTO.lib.proxy.Codeigniter', 'proxy.ci');

Ext.application({
    name: 'APPA',

	// Add path for testing src version - comment this out when building/deploying
	appFolder: ci_base_url+'/app',

    controllers: [
		'Main',
		'Users',
		'Groups',
		'Settings',
		'Roles',
		'Permissions',
		'Paths',
		'Sessions',
		'Info'
    ],

    launch: function() 
	{
		Ext.apply(Ext.form.field.VTypes, {
			passconfirm: function(val, field) {
				if (field.passField) {
					var pwd = field.up('form').down('#' + field.passField);
					return (val == pwd.getValue());
				}
				return true;
			},
			passconfirmText: 'Passwords do not match'
		});

		if (appunto_auth_display_type == "viewport")
		{
			Ext.create('APPA.view.main.Viewport');
		}
		else if (appunto_auth_display_type == "container")
		{
			var container = Ext.create('APPA.view.main.Container',
				{
					height	: appunto_auth_height
				});
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
