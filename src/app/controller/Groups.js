Ext.define('APPA.controller.Groups', {
    extend: 'Ext.app.Controller',

	models: [
		'Group',
		'GroupUser'
	],

	stores: [
		'APPA.store.Groups',
		'APPA.store.GroupUsers'
	],

    views: [
		'group.Frame',
		'group.List',
        'group.ContextMenu',
		'group.Add',
		'group.Edit',
		'group.UserList',
		'group.UserContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_group_list'
	},{
        ref : 'userList',
        selector: 'appa_group_user_list'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_group_frame' : {
				activate		: this.refreshList
			},
            'appa_group_list' : {
				render			: this.defineStoreEventHandlers,
            	select			: this.groupSelected,
                itemdblclick	: this.editGroup,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_group_user_list' : {
                itemcontextmenu	: this.showUserContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_group_list button[action="add"]': {
                click: this.addGroup
            },
            'appa_group_frame button[action="refresh"]': {
                click: this.refreshList
            },
            'appa_group_contextmenu menuitem[action="add"]': {
                click: this.addGroup
            },
			'appa_group_add button[action=save]' : {
				click: this.createGroup
			},
            'appa_group_contextmenu menuitem[action="edit"]': {
                click: this.editGroup
            },
            'appa_group_edit button[action=save]': {
                click: this.updateGroup
            },
            'appa_group_contextmenu menuitem[action="delete"]': {
                click: this.confirmGroupDeletion
            },
            'appa_group_user_list button[toggleGroup="user-view"]': {
                click: this.toggleUserView
            },
            'appa_group_user_contextmenu menuitem[action="add"]': {
                click: this.addUser
            },
            'appa_group_user_contextmenu menuitem[action="remove"]': {
                click: this.removeUser
            }
		});

		/*
		this.getGroupsStore().on({
			scope	: this,
			load	: this.storeLoad
		});
		*/

	},

	refreshList: function(button)
	{
		this.getList().getStore().load();
	},

	defineStoreEventHandlers: function(button)
	{
		this.getList().getStore().on({
			scope	: this,
			load	: this.storeLoad
		});
	},

	/**
	 * Called on the GroupsStore load event.  Clears the GroupUsers store so the
	 * user pane does not contain leftover information.
	 * @return void
	 */
	storeLoad: function()
	{
		var user_list	= this.getUserList(),
			user_store 	= user_list.getStore();

		user_list.setTitle('Users');
		user_store.removeAll();
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_group_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

        menu.showAt(e.getXY());
    },


	groupSelected: function(view, record)
	{
		var user_list	= this.getUserList(),
			user_store 	= user_list.getStore();

		user_list.setTitle('Users in '+record.get('name')+' group');

		user_store.load({
			id 			: record.get('id'),
        	ci_method	: 'users'
		});	
	},

    addGroup: function(source,e) 
    {
		Ext.widget('appa_group_add').showAt(e.getXY());
	},

    createGroup: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('APPA.model.Group'),
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

    editGroup: function(menuitem,e) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_group_edit'),
			form	= view.down('form');

			form.loadRecord(rec);
			view.showAt(e.getXY());
	},

    updateGroup: function(button) 
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


    confirmGroupDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getList().getStore(),
			title	= 'Delete group '+rec.data.name;

        Ext.MessageBox.confirm(title, 'Are you sure you want to delete this group?', Ext.bind(this.deleteGroup,this,[rec,store],true));
	},

    deleteGroup: function(button, dummy, msgbox, record, store)
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

	toggleUserView: function(button) 
	{
		var	users	= this.getUserList(),
			store		= users.getStore();

		if (button.action == 'show_all')
		{
			store.clearFilter();
		}	
		else 
		{
			store.filter('inGroup',1);
		}
	},

    showUserContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_group_user_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.get('inGroup') == 1) 
		{
			menu.down('menuitem[action="add"]').hide();
		} 
		if (rec.data.inGroup == 0) 
		{
			menu.down('menuitem[action="remove"]').hide();
		} 
        menu.showAt(e.getXY());
    },

    addUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			groups 	= this.getList(),
			group	= groups.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		record.set({ hasUser: 1 });
		record.save({
			ci_method	: 'add_user',	
			params		: { group_id	: group.get('id')},
			failure		: fail_cb 
		});	
    },

    removeUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			groups	= this.getList(),
			group	= groups.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		record.set({ hasUser: 0 });
		record.save({
			ci_method	: 'remove_user',	
			params		: { group_id	: group.get('id')},
			failure		: fail_cb 
		});	
    }


});

