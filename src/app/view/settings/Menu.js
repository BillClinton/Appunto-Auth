Ext.define('APPA.view.settings.Menu' ,{
    extend  : 'Ext.tree.Panel',
    alias   : 'widget.appa_settings_menu',

    title   : 'Settings',
    iconCls : 'cog-title', 

	stateId : 'APPA-app-state-settingsmenu',

	rootVisible: false,

    initComponent: function() 
	{

		this.store = Ext.create('Ext.data.TreeStore', {
			root: {
				expanded: true,
				children: [
					{ 
						text	: "Application", 
						expanded: true, 
						iconCls	: 'application', 
						children: [
							{ 
								text	: "Information", 
								id		: 'settings_info',
								iconCls	: 'info-grey', 
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
