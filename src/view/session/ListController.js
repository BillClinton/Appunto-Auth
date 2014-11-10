Ext.define('AppuntoAuth.view.session.ListController' ,{
    extend  : 'Ext.app.ViewController',
	alias	: 'controller.session-list',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

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
		Ext.getStore('Sessions').load();
	},

    confirmSessionDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= Ext.getStore('Sessions'),
			title	= 'Delete session';

		if (rec.data.username != '') title = title + ' (' + Lang.localize('session_delete_user') + ': '+rec.data.username+')';

        Ext.MessageBox.confirm(title, Lang.localize('session_delete_confirm'), Ext.bind(this.deleteSession,this,[rec,store],true));
	},

    deleteSession: function(button, dummy, msgbox, record, store)
    {
        if (button == "yes")
        {
            record.erase(
				{
					success: function() { store.remove(record); } 
				}
			);
        }
	},

	toggleView: function(menuitem) 
	{
		var	sessions	= menuitem.up('appa_session_list'),
			store		= sessions.getStore();
			button      = sessions.down('#session-view-toggle');

		if (menuitem.value == 1)
		{
			store.clearFilter();
			button.setText(Lang.localize('session_view_all'));
		}
		else 
		{
			store.filter('show_all',0);
			button.setText(Lang.localize('session_view_logged_in'));
		}
	}

});

