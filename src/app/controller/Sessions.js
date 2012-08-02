/**
 * Sessions controller.
 */
Ext.define('APPA.controller.Sessions', {
    extend: 'Ext.app.Controller',

	models: [
		'APPA.model.Session'
	],

	stores: [
		'APPA.store.Sessions'
	],

    views: [
		'session.List',
        'session.ContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_session_list'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_session_list' : {
				activate		: this.refreshList,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_session_list button[action="refresh"]': {
                click: this.refreshList
            },
            'appa_session_contextmenu menuitem[action="delete"]': {
                click: this.confirmSessionDeletion
            },
            'appa_session_list button[toggleGroup="view"]': {
                click: this.toggleView
            }
		});
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_session_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

        menu.showAt(e.getXY());
    },

	refreshList: function(button)
	{
		this.getList().getStore().load();
	},

    confirmSessionDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getList().getStore(),
			title	= 'Delete session (user: '+rec.data.username+')';

        Ext.MessageBox.confirm(title, 'Are you sure you want to delete this session?', Ext.bind(this.deleteSession,this,[rec,store],true));
	},

    deleteSession: function(button, dummy, msgbox, record, store)
    {
        if (button == "yes")
        {
            record.destroy(
				{
					success: function() { store.remove(record); } 
				}
			);
        }
	},

	toggleView: function(button) 
	{
		var	sessions	= button.up('appa_session_list'),
			store		= sessions.getStore();

		if (button.action == 'show_all')
		{
			store.filter('show_all',1);
		}	
		else 
		{
			store.filter('show_all',0);
		}
	}

});

