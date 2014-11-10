Ext.define('AppuntoAuth.controller.Permissions', {
    extend: 'Ext.app.Controller',

	models: [
		'Permission'
	],

	stores : [
		'Permissions'
	],

    views: [
		'permission.List',
        'permission.ContextMenu',
		'permission.Add',
		'permission.Edit'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_permission_list'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_permission_list' : {
				activate		: this.refreshList,
                itemdblclick	: this.editPermission,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_permission_list button[action="add"]': {
                click: this.addPermission
            },
            'appa_permission_list button[action="refresh"]': {
                click: this.refreshList
            },
            'appa_permission_contextmenu menuitem[action="add"]': {
                click: this.addPermission
            },
			'appa_permission_add button[action=save]' : {
				click: this.createPermission
			},
            'appa_permission_contextmenu menuitem[action="edit"]': {
                click: this.editPermission
            },
            'appa_permission_edit button[action=save]': {
                click: this.updatePermission
            },
            'appa_permission_contextmenu menuitem[action="delete"]': {
                click: this.confirmPermissionDeletion
            }
		});
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_permission_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.data.active == 1) 
		{
			menu.down('menuitem[action="activate"]').hide();
		} 
		if (rec.data.active == 0) 
		{
			menu.down('menuitem[action="deactivate"]').hide();
		} 
        menu.showAt(e.getXY());
    },

	refreshList: function(button)
	{
		var cb = function(records, operation, success) 
		{
			if (!success)
			{
				this.getList().getStore().removeAll();
			}
		}

		this.getList().getStore().load();
	},

    addPermission: function(source,e) 
    {
		Ext.widget('appa_permission_add').showAt(e.getXY());
	},

    createPermission: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('AppuntoAuth.model.Permission'),
			store	= this.getList().getStore(),
			win_cb;

		win_cb = function(rec, operation) {
				store.insert(0,rec);
				win.close();
		}

		if (form.getForm().isValid())
		{
        	record.set(values);
			record.save({
				success: win_cb 
			});	
		}
	},

    editPermission: function(menuitem,e) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_permission_edit'),
			form	= view.down('form');

			form.loadRecord(rec);
			view.showAt(e.getXY());
	},

    updatePermission: function(button) 
	{
        var win    = button.up('window'),
            form   = win.down('form').form,
            record = form.getRecord(),
            values = form.getValues(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) { win.close(); } else { record.reject() };
		}

		if (form.isDirty())
		{
			if (form.isValid())
			{
				record.set(values);
				record.save({ callback : cb });	
			}
		} 
		else
		{
			win.close();
		}

    },


    confirmPermissionDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getList().getStore(),
			title	= Lang.localize('role_delete')+': '+rec.data.name;

        Ext.MessageBox.confirm(title, Lang.localize('perm_delete_confirm'), Ext.bind(this.deletePermission,this,[rec,store],true));
	},

    deletePermission: function(button, dummy, msgbox, record, store)
    {
		var view = this.getList(),
			cb; 

		cb = function(rec, operation) 
		{
			if (operation.success == true) 
			{ 
				store.remove(record); 
			} 
			else 
			{ 
				store.load( { callback : function() { view.getSelectionModel().select(record); } } ); 
			}
		}

        if (button == "yes")
        {
            record.erase( { callback : cb });
        }
	}

});
