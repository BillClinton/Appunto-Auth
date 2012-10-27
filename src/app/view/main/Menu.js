/**
 * Main menu.
 *
 *
 * This extension of {@link Ext.tree.Panel} defines a store with the main menu 
 * options for the Appunto Auth user interfacei
 *
 * @cfg {String} [title="Menu"] Text on the panel titlebar. 
 * @cfg {boolean} [rootVisible=false] 
 */
Ext.define('APPA.view.main.Menu' ,{
    extend  : 'Ext.tree.Panel',
    alias   : 'widget.appa_main_menu',

	title   : 'Menu',

	stateId : 'APPA-app-state-mainmenu',

	rootVisible: false,

	/**
	 * Create a Ext.data.TreeStore with menu option.
	 * @return void
	 */
    initComponent: function() 
	{
		this.store = Ext.create('Ext.data.TreeStore', {
			root: {
				expanded: true,
				children: [
					{ 
						text	: "Status", 
						id		: 'status',
						iconCls	: 'information', 
						leaf	: true 
					},
					{ 
						text	: "Users", 
						id		: 'users',
						iconCls	: 'user', 
						leaf	: true 
					},
					{ 
						text	: "Groups", 
						id		: 'groups',
						iconCls	: 'group', 
						leaf	: true 
					},
					{ 
						text	: "Roles", 
						id		: 'roles',
						iconCls	: 'shield', 
						leaf	: true 
					},
					{ 
						text	: "Permissions", 
						id		: 'permissions',
						iconCls	: 'lock', 
						leaf	: true 
					},
					{ 
						text	: "Paths", 
						id		: 'paths',
						iconCls	: 'map', 
						leaf	: true 
					},
					{ 
						text	: "Sessions", 
						id		: 'sessions',
						iconCls	: 'monitor', 
						leaf	: true 
					},
					{ 
						text	: "Info", 
						id		: 'main',
						iconCls	: 'information', 
						listeners : {
							'click'	: function()
							{
								console.log('click');
							},
							'render'	: function(c)
							{
								console.log('c:');
								console.log(c);
							}
						},
						children: [
							{
								text    : "Application",
								id      : 'application',
								iconCls : 'application_side_tree',
								leaf	: true 
							},
							{
								text    : "Credits",
								id      : 'credits',
								iconCls : 'trophy',
								leaf	: true 
							},
							{
								text    : "License",
								id      : 'license',
								iconCls : 'open-source',
								leaf	: true 
							}
						]
					}
				]
			}
		});

        this.callParent(arguments);
    }
});
