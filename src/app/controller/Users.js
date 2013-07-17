/**
 * Appunto Auth User controller.
 *
 */
Ext.define('APPA.controller.Users', {
    extend: 'Ext.app.Controller',

	models: [
		'APPA.model.User',
		'APPA.model.UserRole',
		'APPA.model.UserPermission',
		'APPA.model.Login'
	],

	stores: [
		'APPA.store.Users',
		'APPA.store.UserRoles',
		'APPA.store.UserPermissions',
		'APPA.store.Logins'
	],

    views: [
		'user.Frame',
		'user.List',
        'user.ContextMenu',
		'user.Add',
		'user.Edit',
		'user.ChangePassword',
		'user.RoleList',
        'user.RoleContextMenu',
		'user.PermissionList',
        'user.PermissionContextMenu',
        'user.LoginsWidget'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_user_list'
	},{
        ref : 'roleList',
        selector: 'appa_user_role_list'
	},{
        ref : 'permissionList',
        selector: 'appa_user_permission_list'
	},{
        ref : 'loginsWidget',
        selector: 'appa_user_logins_widget'
    }],

	/* */
    init: function() 
	{
        this.control(
        {
            'appa_user_frame' : {
				activate: this.loadStore
			},
            'appa_user_list' : {
				render			: this.defineStoreEventHandlers,
                select			: this.userSelected,
                itemdblclick	: this.editUser,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_user_role_list' : {
                itemcontextmenu	: this.showRoleContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_user_permission_list' : {
                itemcontextmenu	: this.showPermissionContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_user_list button[action="add"]': {
                click: this.addUser
            },
            'appa_user_contextmenu menuitem[action="add"]': {
                click: this.addUser
            },
			'appa_user_add button[action=save]' : {
				click: this.createUser
			},
            'appa_user_contextmenu menuitem[action="edit"]': {
                click: this.editUser
            },
            'appa_user_edit button[action=save]': {
                click: this.updateUser
            },
            'appa_user_contextmenu menuitem[action="delete"]': {
                click: this.confirmUserDeletion
            },
            'appa_user_contextmenu menuitem[action="change_password"]': {
                click: this.changePassword
            },
            'appa_user_changepassword button[action=save]': {
                click: this.updatePassword
            },
            'appa_user_contextmenu menuitem[action="activate"]': {
                click: this.activateUser
            },
            'appa_user_contextmenu menuitem[action="deactivate"]': {
                click: this.deactivateUser
            },
            'appa_user_role_list button[toggleGroup="role-view"]': {
                click: this.toggleRoleView
            },
            'appa_user_role_contextmenu menuitem[action="add"]': {
                click: this.addRole
            },
            'appa_user_role_contextmenu menuitem[action="remove"]': {
                click: this.removeRole
            },
            'appa_user_permission_list button[toggleGroup="user-permission-view"]': {
                click: this.togglePermissionView
            },
            'appa_user_permission_contextmenu menuitem[action="add"]': {
                click: this.addPermission
            },
            'appa_user_permission_contextmenu menuitem[action="remove"]': {
                click: this.removePermission
            }
/*
			'appa_user_logins_widget #refresh': {
                click: this.refreshLoginsWidget
			} 
*/
		});
/*
		this.getUsersStore().on({
			scope	: this,
			load	: this.storeLoad
		});
*/

	},

	
	/**
	 * Loads the Users store.
	 * @return void
	 */
	loadStore: function()
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
	 * Called on the UsersStore load event.  Clears the UsersRoles and UserPermissions stores so those panes
	 * do not contain leftover information.
	 * @return void
	 */
	storeLoad: function()
	{
		this.getRoleList().getStore().removeAll();
		this.getPermissionList().getStore().removeAll();
	},

	userSelected: function(view, record)
	{
		var role_list			= this.getRoleList(),
			permission_list		= this.getPermissionList(),
			role_store 			= role_list.getStore(),
			permission_store 	= permission_list.getStore();

		role_list.setTitle('Roles for '+record.get('username'));
		permission_list.setTitle('Permissions for '+record.get('username'));

		role_store.load({
			id 			: record.get('id'),
        	ci_method	: 'roles'
		});	

		permission_store.load({
			id 			: record.get('id'),
        	ci_method	: 'permissions'
		});	

		//role_list.down('button[action="show_with_role"]').toggle(true);

	},

    editUser: function(menuitem) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_user_edit'),
			form	= view.down('form');

			form.loadRecord(rec);
	},

    updateUser: function(button) 
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

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_user_contextmenu');
	
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

    addUser: function(source,e) 
    {
		Ext.widget('appa_user_add').showAt(e.getXY());
	},

    createUser: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('APPA.model.User'),
			store	= this.getList().getStore(),
			cb;

		cb = function(rec, operation) {
				store.insert(0,rec);
				win.close();
		}

		if (form.getForm().isValid())
		{
        	record.set(values);
			record.save({
				callback : cb 
			});	
		}
	},

    editUser: function(menuitem,e) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_user_edit'),
			form	= view.down('form');

			form.loadRecord(rec);
			view.showAt(e.getXY());
	},

    updateUser: function(button) 
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


    confirmUserDeletion: function(menuitem) 
	{
        var rec     = menuitem.up('menu').getRecord(),
			store	= this.getUsersStore(),
			title	= 'Delete user '+rec.data.username+' ('+rec.data.email+')';

        Ext.MessageBox.confirm(title, 'Are you sure you want to delete this user?', Ext.bind(this.deleteUser,this,[rec,store],true));
	},

    deleteUser: function(button, dummy, msgbox, record, store)
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

    changePassword: function(menuitem) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_user_changepassword'),
			form	= view.down('form');

			form.loadRecord(rec);
	},


    updatePassword: function(button) 
	{
        var win    = button.up('window'),
            form   = win.down('form').form,
            record = form.getRecord(),
            values = form.getValues(),
			win_cb;

		win_cb = function(rec, operation) {
			win.close(); 
		}

		if (form.isValid())
		{
        	record.set(values);
			record.save({
				ci_method	: 'update_pass',	
				success		: win_cb 
			});	
			// remove passwords from record
			record.data.password = '';
			record.data.password2 = '';
		}
    },

    activateUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ active: 1 });
		record.save({ failure: fail_cb });	
    },

    deactivateUser: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ active: 0 });
		record.save({ failure: fail_cb });	
    },

	toggleRoleView: function(button) 
	{
		var	roles		= this.getRoleList(),
			store		= roles.getStore();

		if (button.action == 'show_all')
		{
			store.clearFilter();
			//roles.columns[0].setVisible(true);   // too fancy - might be confusing
		}	
		else 
		{
			store.filter('hasRole',1);
			//roles.columns[0].setVisible(false);
		}
	},

    showRoleContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_user_role_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.data.hasRole == 1) 
		{
			menu.down('menuitem[action="add"]').hide();
		}   
		else if (rec.data.hasRole == 0) 
		{
			menu.down('menuitem[action="remove"]').hide();
		} 
        menu.showAt(e.getXY());
    },

    addRole: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			users	= this.getList(),
			user	= users.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		console.log(user);

		record.set({ hasRole: 1 });
		record.save({
			ci_method	: 'add_role',	
			params		: { user_id	: user.get('id')},
			failure		: fail_cb 
		});	
    },

    removeRole: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			users	= this.getList(),
			user	= users.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		console.log(user);

		record.set({ hasRole: 0 });
		record.save({
			ci_method	: 'remove_role',	
			params		: { user_id	: user.get('id')},
			failure		: fail_cb 
		});	
    },

	togglePermissionView: function(button) 
	{
		var	permissions = this.getPermissionList(),
			store		= permissions.getStore();

		if (button.action == 'show_all')
		{
			store.clearFilter();
			//roles.columns[0].setVisible(true);   // too fancy - might be confusing
		}	
		else 
		{
			store.filter('hasPermission',1);
			//roles.columns[0].setVisible(false);
		}
	},

    showPermissionContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu = Ext.widget('appa_user_permission_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		// Show/Hide menu items based on record state
		if (rec.data.userHasPermission == 1) 
		{
			menu.down('menuitem[action="add"]').hide();
		}   
		else if (rec.data.userHasPermission == 0) 
		{
			menu.down('menuitem[action="remove"]').hide();
		} 
        menu.showAt(e.getXY());
    },

    addPermission: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			users	= this.getList(),
			user	= users.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		console.log(user);

		record.set({ userHasPermission: 1 });
		record.save({
			ci_method	: 'add_permission',	
			params		: { user_id	: user.get('id')},
			failure		: fail_cb 
		});	
    },

    removePermission: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			users	= this.getList(),
			user	= users.getSelectionModel().getSelection()[0],
			fail_cb;

		fail_cb = function() { record.reject(); }
	
		console.log(user);

		record.set({ userHasPermission: 0 });
		record.save({
			ci_method	: 'remove_permission',	
			params		: { user_id	: user.get('id')},
			failure		: fail_cb 
		});	
    }
/*
	refreshLoginsWidget: function()
	{
		this.getLoginsWidget().getStore().load();
	}
*/
});

