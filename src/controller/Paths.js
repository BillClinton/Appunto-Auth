Ext.define('AppuntoAuth.controller.Paths', {
    extend: 'Ext.app.Controller',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	models: [
		'Path',
		'Permission'
	],

	stores: [
		'Paths',
		'Controllers',
		'PathItems',
		'PermissionsSelection'
	],

    views: [
		'path.Frame',
		'path.ControllerView',
		'path.PathView',
        'path.ContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_path_list'
	},{
        ref : 'delete_unfound_button',
        selector: 'appa_path_list button[action="delete_not_found"]'
	},{
        ref : 'frame',
        selector: 'appa_path_frame'
	},{
        ref : 'controllers',
        selector: 'appa_path_controller_view'
    }],

    init: function() 
	{
		this.lastSelected = null;

        this.control(
        {
			'appa_path_frame': {
				activate		: this.pathsActivate
			},
            'appa_path_path_view' : {
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_path_contextmenu menuitem[action="set_public"]': {
                click: this.setPublic
            },
            'appa_path_contextmenu menuitem[action="set_private"]': {
                click: this.setPrivate
            },
            'appa_path_contextmenu menuitem[group="permission"]': {
                click: this.setPermission
            },
            'appa_path_contextmenu menuitem[action="remove_permission"]': {
                click: this.removePermission
            },
            'appa_path_contextmenu menuitem[action="delete"]': {
                click: this.deletePath
            },
			'appa_path_frame button[action="verify-paths"]': {
				click: this.verifyPaths
            },
			'appa_path_controller_view': {
				select: this.controllerSelected
			}
		});

	},

	pathsActivate: function()
	{
		// Load permissions selection store for context menu
		Ext.getStore('PermissionsSelection').load();

		this.verifyPaths();
	},	

	verifyPaths: function() 
	{
		var el		= this.getFrame().up('container').getEl(),
			store	= Ext.getStore('Paths'),
			me		= this,
			cb;

		cb = function(records, operation, success) 
		{
			el.unmask();
			if (success && operation.getResultSet().total > 0)
			{
					Ext.Msg.alert(Lang.localize('result'),operation.getResultSet().message,me.refreshView,me);
			}
			else
			{
				me.refreshView();
			}
		}

		el.mask(Lang.localize('path_verify'));

		store.load({
        	ci_method	: 'verify_paths',
			callback	: cb
		})

	},

	refreshView: function(reselect,refreshPathWindow) 
	{
		var me		= this,
			el		= this.getFrame().up('container').getEl(),
			cb;

		cb = function(records, operation, success) 
		{
			if (success)
			{
				me.loadControllers();
				el.unmask(); 
			}
			else
			{
				Ext.getStore('Paths').removeAll();
			}
		}

		this.setLastSelected();
		el.mask(Lang.localize('path_refreshing'));
		Ext.getStore('Paths').load({callback: cb});
	},

	setLastSelected: function() 
	{
		this.lastSelected = this.getControllers().getSelectionModel().getLastSelected();
	},

	restoreSelection: function() 
	{
		var store		= Ext.getStore('Controllers'),
			view		= this.getControllers();

		if (this.lastSelected != null && this.lastSelected != undefined) {
			idx = store.findExact('ci_controller',this.lastSelected.get('ci_controller'));
			view.getSelectionModel().select(idx);
		}
	},

	loadControllers: function()
	{
		var store		= Ext.getStore('Paths'),
			view		= this.getControllers(),
			view_store	= Ext.getStore('Controllers'),
			records		= store.getRange(),
			controllers = [],
			view_data	= [],
			meta 		= {},
			controller;

		Ext.Array.each(records, function(rec) {
			controller = rec.get('ci_controller');
			if (Ext.Array.indexOf(controllers,controller) == -1) Ext.Array.push(controllers,controller);
		});

		Ext.Array.each(controllers, function(ci_class) {
			meta[ci_class] =
				{
					ci_controller	: ci_class,
					dir				: '',
					full_path		: '',
					methods			: 0,
					public_methods	: 0,
					private_methods	: 0
				};
		});

		Ext.Array.each(records, function(rec) {
			ci_class 	= rec.get('ci_controller');

			meta[ci_class].dir = rec.get('dir');
			meta[ci_class].full_path = rec.get('full_path');
		
			meta[ci_class].methods += 1;	

			if (rec.get('public_flag')==1) 
			{
				meta[ci_class].public_methods += 1;	
			}
			else
			{
				meta[ci_class].private_methods += 1;	
			}
		});

		Ext.Array.each(controllers, function(ci_class) {
			Ext.Array.push(view_data,meta[ci_class]);
		});

		view_store.loadData(view_data);
		this.restoreSelection();

	},

	controllerSelected: function(view,rec) 
	{
		this.loadPaths(rec.get('ci_controller'));
		this.lastSelected = rec;
	},

	loadPaths: function(controller)
	{
		var	store		= Ext.getStore('Paths'),
			item_store	= Ext.getStore('PathItems'),
			records		= store.getRange()
			filtered	= [];

		Ext.Array.each(records, function(record) {
			if (record.get('ci_controller') == controller)
			{
				Ext.Array.push(filtered,record);
			}
		});

		item_store.loadData(filtered);
	},

	expandAllGroups: function() 
	{
		this.getList().getView().getFeature('grouping').expandAll();
	},

	collapseAllGroups: function() 
	{
		this.getList().getView().getFeature('grouping').collapseAll();
	},

	groupingChanged: function(store, grouper) 
	{
		var list 	= this.getList(),
			col		= grouper.items[0].property;

		list.features[0].groupHeaderTpl = list.getGroupHeader(col);
	},

    showContextMenu: function(view, rec, item, idx, e)
    {
        e.preventDefault();

		var menu 	= Ext.widget('appa_path_contextmenu'),
			store   = Ext.getStore('PermissionsSelection'),
			perms	= store.getRange();
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

		Ext.Array.each(perms, function(perm) 
		{
			perm_menu_item =
			{
				text	: perm.get('name'),
				value	: perm.get('id'),
				checked	: rec.get('permission_id') == perm.get('id'),
				group	: 'permission'
			};
			menu.down('menuitem[action="set_permission"]').menu.add(perm_menu_item);
		});


		// Show/Hide menu items based on record state
		menu.down('menuitem[action="set_private"]').setVisible(rec.data.public_flag != 0);
		menu.down('menuitem[action="set_public"]').setVisible(rec.data.public_flag != 1);

		// Enable set permission if not public
		menu.down('menuitem[action="set_permission"]').setDisabled(rec.data.public_flag == 1);

		// Enable remove permission if not public and has a permission
		menu.down('menuitem[action="remove_permission"]').setDisabled(rec.data.public_flag == 1 || rec.get('permission_id')==0);

		// Enable delete if record not found 
		menu.down('menuitem[action="delete"]').setDisabled(rec.data.found != 0);

        menu.showAt(e.getXY());
    },

    findPaths: function() 
    {
		var me		= this,
			list	= this.getList(),
			store 	= list.getStore(),
			cb;

		cb = function(records, operation, success) 
		{
			if (success)
			{
				if (operation.getResultSet().total > 0)
				{
					Ext.Msg.alert('Result',operation.getResultSet().message,me.refreshList,me);
				}
				else
				{
					me.refreshList();
				}
			}
		}

		store.load({
        	ci_method	: 'verify_paths',
			callback	: cb
		});	
	},

	refreshList: function()
	{
		var me		= this,
			list	= this.getList(),
			store 	= list.getStore(),
			cb,
			unfound;

		cb = function(records, operation, success) 
		{
			if (success)
			{
				unfound = store.findBy(function(rec){
					if (rec.get('found') == 0) return true;
				});
				me.getDelete_unfound_button().setDisabled(unfound == -1);
			}
		}

		store.load({
			callback	: cb
		});	
	},

    setPublic: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			store	= Ext.getStore('Paths'),
			me		= this,
			cb;

		cb = function(records, operation) { operation.success ? me.loadControllers() : record.reject() };

		rec = store.getRange(store.findExact('id',record.get('id')))[0];

		rec.set({ public_flag: 1 });
		rec.save({ callback: cb });	
    },

    setPrivate: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			store	= Ext.getStore('Paths'),
			me		= this,
			cb;

		cb = function(records, operation) { operation.success ? me.loadControllers() : record.reject() };

		rec = store.getRange(store.findExact('id',record.get('id')))[0];

		rec.set({ public_flag: 0 });
		rec.save({ callback: cb });	
    },

	denyPermissionChangeForPublic: function(e)
	{
		// why?
		//if (e.record.get('public_flag')==1) return false;
		return true;
	},

    updatePath: function(editor, e) 
	{
		var fail_cb = function(rec, operation) { 
			e.record.reject(); 
		};

		if (e.field == 'permission_name') 
		{
			e.record.set('permission_id',e.value);
		}

		if (e.value != e.originalValue)
		{
			e.record.save({
				failure: fail_cb 
			});	
		}
    },

    setPermission: function(menuitem) 
	{
        var record 	= menuitem.up('menu').up('menu').getRecord(),
			store	= Ext.getStore('Paths'),
			me		= this,
			cb;

		cb = function(records, operation) { operation.success ? me.loadControllers() : record.reject() };

		rec = store.getRange(store.findExact('id',record.get('id')))[0];

		rec.set({ permission_id: menuitem.value });
		rec.save({ callback: cb });	

    },

    removePermission: function(menuitem) 
	{
        var record	= menuitem.up('menu').getRecord(),
			fail_cb = function(rec, operation) { record.reject(); };

		record.save({
			failure		: fail_cb,
			ci_method	: 'remove_permission'
		});	
    },

    deletePath: function(menuitem)
    {
        var record 	= menuitem.up('menu').getRecord(),
			store	= Ext.getStore('Paths'),
			me		= this,
			rec,cb;

		cb = function(records, operation) 
		{ 
			if (operation.success)
			{
				me.refreshView(true); 
			}	
			else { record.reject() };
		};

		rec = store.getRange(store.findExact('id',record.get('id')))[0];

		rec.erase({ callback: cb });
	},

    deleteNotFound: function()
    {
		var me		= this,
			list	= this.getList(),
			store 	= list.getStore(),
			cb;

		cb = function(records, operation, success) 
		{
			if (success)
			{
				me.findPaths();
			}
		}

		store.load({
        	ci_method	: 'delete_not_found',
			callback	: cb
		});	
	},

    filterAuthPaths: function(button)
    {
		var	list	= this.getList(),
			store 	= list.getStore();

		if (button.pressed)
		{
			store.filter({filterFn: function(item) { return item.get("dir") != 'appunto-auth'; }});	
		}
		else
		{
			store.clearFilter();
		}
	}
});


