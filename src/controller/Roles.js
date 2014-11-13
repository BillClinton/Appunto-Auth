Ext.define('AppuntoAuth.controller.Roles', {
    extend: 'Ext.app.Controller',

	models: [
		'Role',
		'RolePermission'
	],

	stores: [
		'Roles',
		'RolePermissions'
	],

    views: [
		'role.Frame',
		'role.List',
        'role.ContextMenu',
		'role.Add',
		'role.Edit',
		'role.PermissionList',
		'role.PermissionContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_role_list'
	},{
        ref : 'permissionsList',
        selector: 'appa_role_permission_list'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_role_frame' : {
				activate		: this.refreshList
			},
            'appa_role_list' : {
				render			: this.defineStoreEventHandlers,
            	select			: this.roleSelected,
                itemdblclick	: this.editRole,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_role_permission_list' : {
                itemcontextmenu	: this.showPermissionContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_role_list button[action="add"]': {
                click: this.addRole
            },
            'appa_role_frame button[action="refresh"]': {
                click: this.refreshList
            },
            'appa_role_contextmenu menuitem[action="add"]': {
                click: this.addRole
            },
			'appa_role_add button[action=save]' : {
				click: this.createRole
			},
            'appa_role_contextmenu menuitem[action="edit"]': {
                click: this.editRole
            },
            'appa_role_edit button[action=save]': {
                click: this.updateRole
            },
            'appa_role_contextmenu menuitem[action="delete"]': {
                click: this.confirmRoleDeletion
            },
            'appa_role_permission_list menuitem[group="permission-view"]': {
                click: this.togglePermissionView
            },
            'appa_role_permission_contextmenu menuitem[action="add"]': {
                click: this.addPermission
            },
            'appa_role_permission_contextmenu menuitem[action="remove"]': {
                click: this.removePermission
            }
		});

	},

	refreshList: function(button)
	{
		var view 	= this.getList(),
			sm 		= view.getSelectionModel(),
			cb;

		cb = function() 
		{
			// reselct record, forcing reload of permissions grid
			if (sm.hasSelection()) 
			{
				rec = sm.getSelection()[0];
				sm.deselectAll()
				sm.select(rec);
			}
		}

		view.getStore().load( {callback: cb });

	},

	defineStoreEventHandlers: function(button)
	{
		this.getList().getStore().on({
			scope	: this,
			load	: this.storeLoad
		});
	},

	/**
	 * Called on the RolesStore load event.  Clears the RolePermissions store so the
	 * permission pane does not contain leftover information.
	 * @return void
	 */
	storeLoad: function()
	{
		var permission_list		= this.getPermissionsList(),
			permission_store 	= permission_list.getStore();

		permission_list.setTitle(Lang.localize('tab_permissions'));
		permission_store.removeAll();
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_role_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

        menu.showAt(e.getXY());
    },

	roleSelected: function(view, record)
	{
		var permission_list		= this.getPermissionsList(),
			permission_store 	= permission_list.getStore();

		permission_list.setTitle(Lang.localize('role_perm_for')+' '+record.get('name'));

		permission_store.load({
			id 			: record.get('id'),
        	ci_method	: 'permissions'
		});	
	},

    addRole: function(source,e) 
    {
		var	win		= Ext.widget('appa_role_add'),
			form	= win.down('form');

		form.getForm().findField('name').focus(false,100); 
		win.showAt(e.getXY());
	},

    createRole: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('AppuntoAuth.model.Role'),
			view	= this.getList(),
			store	= view.getStore(),
			win_cb;

		win_cb = function(rec, operation) {
				store.insert(0,rec);
				view.getSelectionModel().select(rec);
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

    editRole: function(menuitem,e) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			win		= Ext.widget('appa_role_edit'),
			form	= win.down('form');

		form.loadRecord(rec);
		form.getForm().findField('name').focus(false,100); 
		win.showAt(e.getXY());
	},

    updateRole: function(button) 
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


    confirmRoleDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getList().getStore(),
			title	= Lang.localize('role_delete')+': '+rec.data.name;

        Ext.MessageBox.confirm(title, Lang.localize('role_delete_confirm'), Ext.bind(this.deleteRole,this,[rec,store],true));
	},

    deleteRole: function(button, dummy, msgbox, record, store)
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
	},

	togglePermissionView: function(menuitem) 
	{
		this.showAllPermissions(menuitem.value == 1);
	},

	showAllPermissions: function(showall) 
	{
		var	permissions	= this.getPermissionsList(),
			store		= permissions.getStore(),
			button		= permissions.down('#permission-view-toggle');

		if (showall == true)
		{
			store.clearFilter();
			button.setText(Lang.localize('role_perm_view_all'));
		}
		else 
		{
			store.filter('inRole',1);
			button.setText(Lang.localize('role_perm_view_selected'));
		}
	},

    showPermissionContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_role_permission_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.get('inRole') == 1) 
		{
			menu.down('menuitem[action="add"]').hide();
		} 
		if (rec.data.inRole == 0) 
		{
			menu.down('menuitem[action="remove"]').hide();
		} 
        menu.showAt(e.getXY());
    },

    addPermission: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			roles 	= this.getList(),
			role	= roles.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		record.set({ hasPermission: 1 });
		record.save({
			ci_method	: 'add_permission',	
			params		: { role_id	: role.get('id')},
			failure		: fail_cb 
		});	
    },

    removePermission: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			roles	= this.getList(),
			role	= roles.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		record.set({ hasPermission: 0 });
		record.save({
			ci_method	: 'remove_permission',	
			params		: { role_id	: role.get('id')},
			failure		: fail_cb 
		});	
    }


});

