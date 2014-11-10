/**
 * The Navigation controller used to handle things like routes.
 */
Ext.define('AppuntoAuth.controller.Navigation', {
    extend: 'Ext.app.Controller',

	views: [
		'main.Main',
		'main.Frame'
	],

	refs:
	[{
		ref: 'tabs',
		selector: 'appa-main-frame'
	}],


	config : {
		routes	: {
			'status'		: 'redirStatus',
			'users'			: 'redirUsers',
			'roles'			: 'redirRoles',
			'permissions'	: 'redirPermissions',
			'paths'			: 'redirPaths',
			'sessions'		: 'redirSessions'
		}
	},

    init: function() 
	{
        this.control(
        {
            'appa-main-frame': {
                beforetabchange	: this.redirTabClick
            },
            'appa-main button[action="logout"]': {
                click			: this.logout
            }
		});
	},

	logout: function()
	{
		console.log('logout: function');
		location.href = ci_site_url + ci_logout_url;
	},

	redirTabClick: function(panel,newCard) 
	{
		this.getTabs().on('beforetabchange',function(){console.log('func');});
		this.getTabs().clearListeners();
		this.redirectTo(newCard.itemId.substr(4));
		this.getTabs().on('beforetabchange',this.redirTabClick,this);
	},

	changeCardSuppressEvent: function(tab)
	{
		//this.getTabs().on('beforetabchange',function(){});
		this.getTabs().setActiveTab(tab);
		//this.getTabs().on('beforetabchange',this.redirTabClick,this);
	},

	redirStatus: function() 
	{
		this.getTabs().setActiveTab('tab-status');
		//this.changeCardSuppressEvent('tab-status');
	},

	redirUsers: function() 
	{
		this.getTabs().setActiveTab('tab-users');
		//this.changeCardSuppressEvent('tab-users');
	},

	redirRoles: function() 
	{
		this.getTabs().setActiveTab('tab-roles');
		//this.changeCardSuppressEvent('tab-roles');
	},

	redirPermissions: function() 
	{
		this.getTabs().setActiveTab('tab-permissions');
		//this.changeCardSuppressEvent('tab-permissions');
	},

	redirPaths: function() 
	{
		this.getTabs().setActiveTab('tab-paths');
		//this.changeCardSuppressEvent('tab-paths');
	},

	redirSessions: function() 
	{
		this.getTabs().setActiveTab('tab-sessions');
		//this.changeCardSuppressEvent('tab-sessions');
	}

});
