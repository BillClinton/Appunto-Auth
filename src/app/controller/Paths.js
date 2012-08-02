Ext.define('APPA.controller.Paths', {
    extend: 'Ext.app.Controller',

	models: [
		'APPA.model.Path',
		'APPA.model.Permission'
	],

	stores: [
		'APPA.store.Paths',
		'APPA.store.PermissionsSelection'
	],

    views: [
		'path.List',
        'path.ContextMenu'
    ],

    refs : [{
        ref : 'list',
        selector: 'appa_path_list'
	},{
        ref : 'delete_unfound_button',
        selector: 'appa_path_list button[action="delete_not_found"]'
    }],

    init: function() 
	{
        this.control(
        {
            'appa_path_list' : {
				activate		: this.findPaths,
                beforeedit		: this.denyPermissionChangeForPublic,
                edit			: this.updatePath,
                itemcontextmenu	: this.showContextMenu,
                // Stop the browser getting the event
                containercontextmenu: function(view, e) { e.preventDefault(); }, 
                contextmenu		: function(e) { e.preventDefault(); } 
            },
            'appa_path_list button[action="refresh"]': {
                click: this.findPaths
            },
            'appa_path_list button[action="expand_all"]': {
                click: this.expandAllGroups
            },
            'appa_path_list button[action="collapse_all"]': {
                click: this.collapseAllGroups
            },
            'appa_path_list button[action="hide_auth_paths"]': {
                click: this.filterAuthPaths
            },
            'appa_path_list button[action="delete_not_found"]': {
                click: this.deleteNotFound
            },
            'appa_path_contextmenu menuitem[action="set_public"]': {
                click: this.setPublic
            },
            'appa_path_contextmenu menuitem[action="set_private"]': {
                click: this.setPrivate
            },
//            'appa_path_contextmenu menuitem[action="set_permission"]': {
//                click: this.setPermission
//            },
            'appa_path_contextmenu menuitem[action="remove_permission"]': {
                click: this.removePermission
            },
            'appa_path_contextmenu menuitem[action="delete"]': {
                click: this.deletePath
            }
		});

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

		var menu = Ext.widget('appa_path_contextmenu');
	
		// pass the contextmenu the record so we don't have to worry about a selection change	
		menu.setRecord(rec);

		// select the record that was context-clicked
		view.getSelectionModel().select(rec,false,true); // keepExisting=false, suppressEvent=true

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
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ public_flag: 1 });
		record.save({ failure: fail_cb });	
    },

    setPrivate: function(menuitem) 
	{
        var record 	= menuitem.up('menu').getRecord(),
			fail_cb;

		fail_cb = function() { record.reject(); }

		record.set({ public_flag: 0 });
		record.save({ failure: fail_cb });	
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
        var rec     = menuitem.up('menu').getRecord(),
			list	= this.getList(),
			store 	= list.getStore();

		rec.destroy(
		{
			success: function() { store.remove(rec); } 
		});
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

