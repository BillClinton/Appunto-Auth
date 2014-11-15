Ext.define('AppuntoAuth.controller.Users', {
    extend: 'Ext.app.Controller',

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

	models: [
		'User',
		'UserRole',
		'UserPermission',
		'Login'
	],

	stores : [
		'Users',
		'UserRoles',
		'UserPermissions',
		'Logins'
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
        ref : 'rolePermissionFrame',
        selector: '#role-permission-frame'
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
                deselect		: this.userDeselected,
                itemdblclick	: this.editUser,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_user_list tool' : {
				click			: this.resizeUserList	
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
            'appa_user_role_list menuitem[group="role-view"]': {
                click: this.toggleRoleView
            },
            'appa_user_role_contextmenu menuitem[action="add"]': {
                click: this.addRole
            },
            'appa_user_role_contextmenu menuitem[action="remove"]': {
                click: this.removeRole
            },
            'appa_user_permission_list menuitem[group="permission-view"]': {
                click: this.togglePermissionView
            },
            'appa_user_permission_contextmenu menuitem[action="add"]': {
                click: this.addPermission
            },
            'appa_user_permission_contextmenu menuitem[action="remove"]': {
                click: this.removePermission
            }
		});

	},

	
	/**
	 * Loads the Users store.
	 * @return void
	 */
	loadStore: function()
	{
		//this.getList().getStore().load();
		var view 	= this.getList(),
			sm 		= view.getSelectionModel(),
			cb;

		cb = function() 
		{
			// reselct record, forcing reload of roles/permissions grids
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

	resizeUserList: function(tool)
	{
		var list	= this.getList(),
			frame 	= this.getRolePermissionFrame();

		if (frame.collapsed)
		{
			frame.expand();
			frame.setIconCls('shield');
			this.setRoleTitle();
			tool.setType('next');	
			list.columns[5].hide();
			list.columns[6].hide();
			list.columns[7].hide();
			list.columns[8].hide();
		}
		else
		{
			frame.collapse();
			frame.setIconCls('');
			this.setRoleTitle();
			tool.setType('prev');	
			list.columns[5].show();
			list.columns[6].show();
			list.columns[7].show();
			list.columns[8].show();
		}
	},

	/**
	 * Called on the UsersStore load event.  Clears the UsersRoles and UserPermissions stores so those panes
	 * do not contain leftover information.
	 * @return void
	 */
	storeLoad: function()
	{
		var role_list			= this.getRoleList(),
			permission_list		= this.getPermissionList();

		this.getRoleList().getStore().removeAll();
		this.setEmptyMessageRole();
		this.setRoleTitle();

		this.getPermissionList().getStore().removeAll();
		this.setEmptyMessagePerm();
		this.setPermissionTitle();
	},

	setEmptyMessageRole: function()
	{
		var selection	= this.getList().getSelectionModel().hasSelection(),
			list		= this.getRoleList();

		if (selection)
		{
			list.getView().emptyText = '<div class="empty"><p>'+Lang.localize('user_no_roles')+'</p></div>';
		}
		else
		{
			list.getView().emptyText = '<div class="empty"><p>'+Lang.localize('user_select')+'</p></div>';
		}
		list.getView().refresh();
	},

	setEmptyMessagePerm: function()
	{
		var selection	= this.getList().getSelectionModel().hasSelection(),
			list		= this.getPermissionList();

		if (selection)
		{
			list.getView().emptyText = '<div class="empty"><p>'+Lang.localize('user_no_perm')+'</p></div>';
		}
		else
		{
			list.getView().emptyText = '<div class="empty"><p>'+Lang.localize('user_select')+'</p></div>';
		}
		list.getView().refresh();
	},

	setRoleTitle: function(username)
	{
		var frame = this.getRolePermissionFrame();

		if (frame.collapsed)
		{
			frame.setTitle(Lang.localize('user_role_list')+ ' / ' +Lang.localize('user_perm_list'));
		}
		else if (username != undefined) 
		{
			frame.setTitle(Lang.localize('user_role_list_for')+ ' ' +username);
		}
		else
		{
			frame.setTitle(Lang.localize('user_role_list'));
		}

	},

	setPermissionTitle: function(username)
	{
		var permission_list = this.getPermissionList();
		
		if (username != undefined) 
		{
			permission_list.setTitle(Lang.localize('user_perm_list_for')+ ' ' +username);
		}
		else
		{
			permission_list.setTitle(Lang.localize('user_perm_list'));
		}

	},

	userSelected: function(view, record)
	{
		var role_list			= this.getRoleList(),
			permission_list		= this.getPermissionList(),
			role_store 			= role_list.getStore(),
			permission_store 	= permission_list.getStore();

		this.setEmptyMessageRole();
		this.setEmptyMessagePerm();

		this.setRoleTitle(record.get('username'));
		this.setPermissionTitle(record.get('username'));

		role_store.load({
			id 			: record.get('id'),
        	ci_method	: 'roles'
		});	

		permission_store.load({
			id 			: record.get('id'),
        	ci_method	: 'permissions'
		});	

	},

	userDeselected: function(view, record)
	{
		var role_list			= this.getRoleList(),
			permission_list		= this.getPermissionList(),
			role_store 			= role_list.getStore(),
			permission_store 	= permission_list.getStore();

		this.setEmptyMessageRole();
		this.setEmptyMessagePerm();

		if (!this.getList().getSelectionModel().hasSelection())
		{
			this.setRoleTitle(undefined);
			this.setPermissionTitle(undefined);

			role_store.removeAll();
			permission_store.removeAll();
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
		var	win		= Ext.widget('appa_user_add'),
			form	= win.down('form');

		form.getForm().findField('username').focus(false,100); 
		win.show();
	},

    createUser: function(button) 
    {
        var win    	= button.up('window'),
            form   	= win.down('form'),
            values 	= form.getValues(),
            record 	= Ext.create('AppuntoAuth.model.User'),
			store	= this.getList().getStore(),
			cb;

		cb = function(rec, operation) 
		{
			if (operation.success == true) 
			{ 
				store.insert(0,rec);
				win.close();
			} 
			else 
			{ 
				store.remove(record); 
			}
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
			win		= Ext.widget('appa_user_edit'),
			form	= win.down('form');

		form.loadRecord(rec);
		form.getForm().findField('username').focus(false,100); 
		win.show();
	},

    updateUser: function(button) 
	{
        var win    = button.up('window'),
            form   = win.down('form').form,
            record = form.getRecord(),
            values = form.getValues(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) { rec.commit(); win.close(); } else { record.reject() };
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
			store	= this.getList().getStore(),
			title	= Lang.localize('user_delete')+ ' '+rec.data.username+' ('+rec.data.email+')';

        Ext.MessageBox.confirm(title, Lang.localize('user_delete_confirm'), Ext.bind(this.deleteUser,this,[rec,store],true));
	},

    deleteUser: function(button, dummy, msgbox, record, store)
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

    changePassword: function(menuitem) 
    {
        var rec     = menuitem.up('menu').getRecord(),
			view 	= Ext.widget('appa_user_changepassword'),
			form	= view.down('form');

		form.loadRecord(rec);
		form.getForm().findField('password').focus(false,100); 
		view.show();
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

	toggleRoleView: function(menuitem) 
	{
		this.showAllRoles(menuitem.value == 1);
	},

	showAllRoles: function(showall) 
	{
		var	roles		= this.getRoleList(),
			store		= roles.getStore(),
			button		= roles.down('#role-view-toggle');

		if (showall == true)
		{
			store.clearFilter();
			button.setText(Lang.localize('user_role_view_all'));
		}
		else 
		{
			store.filter('hasRole',1);
			button.setText(Lang.localize('user_role_view_selected'));
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
        var record 				= menuitem.up('menu').getRecord(),
			users				= this.getList(),
			user				= users.getSelectionModel().getSelection()[0],
			permission_store 	= this.getPermissionList().getStore(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) 
			{ 
				permission_store.load({
					id 			: user.get('id'),
					ci_method	: 'permissions'
				});	
			} 
			else { record.reject() };
		}

		record.set({ hasRole: 1 });
		record.save({
			ci_method	: 'add_role',	
			params		: { user_id	: user.get('id')},
			callback	: cb
		});	
    },

    removeRole: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			users	= this.getList(),
			user	= users.getSelectionModel().getSelection()[0],
			permission_store 	= this.getPermissionList().getStore(),
			cb;

		cb = function(rec, operation) {
			if (operation.success == true) 
			{ 
				permission_store.load({
					id 			: user.get('id'),
					ci_method	: 'permissions'
				});	
			} 
			else { record.reject() };
		}

		record.set({ hasRole: 0 });
		record.save({
			ci_method	: 'remove_role',	
			params		: { user_id	: user.get('id')},
			callback	: cb
		});	
    },

	togglePermissionView: function(menuitem) 
	{
		this.showAllPermissions(menuitem.value == 1);
	},

	showAllPermissions: function(showall) 
	{
		var	permissions	= this.getPermissionList(),
			store		= permissions.getStore(),
			button		= permissions.down('#permission-view-toggle');

		if (showall == true)
		{
			store.clearFilter();
			button.setText(Lang.localize('user_perm_view_all'));
		}
		else 
		{
			store.filter('hasPermission',1);
			button.setText(Lang.localize('user_perm_view_selected'));
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
	
		record.set({ userHasPermission: 0 });
		record.save({
			ci_method	: 'remove_permission',	
			params		: { user_id	: user.get('id')},
			failure		: fail_cb 
		});	
    }
});
