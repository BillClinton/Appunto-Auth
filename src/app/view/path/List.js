/**
 *
 */
Ext.define('APPA.view.path.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_path_list',
    store   : 'Paths',

    title   : 'Application Paths',
    iconCls : 'map', 

	autoScroll	: true,

	features: [{
		ftype: 'grouping',
		groupHeaderTpl: 'Controller: {name}, {rows.length} methods',
		collapseAll: function() {
			var self = this, view = self.view;
			view.el.query('.x-grid-group-hd').forEach(function (group) {
				var group_body = Ext.fly(group.nextSibling, '_grouping');
				self.collapse(group_body);
			});
		},
		expandAll: function() {
			var self = this, view = self.view;
			view.el.query('.x-grid-group-hd').forEach(function (group) {
				var group_body = Ext.fly(group.nextSibling, '_grouping');
				self.expand(group_body);
			});
		}
	}],

	// Add a custom config for group headers
	groupHeaders : {
		ci_controller 	: 'Controller: {name}, {rows.length} methods',
		ci_method		: 'Method: {name}, exists in {rows.length} controllers',
		public_flag		: 'Access: {[values.name==1 ? "Public" : "Private" ]}, {rows.length} methods',
		permission_name : '{[values.name=="" ? "No permission set" : "Permission: "+values.name ]}, {rows.length} methods'
	},

    initComponent: function() 
	{
		this.plugins = [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1
			})
		]; 

        this.columns = [
			{
				header   		: '', 
				dataIndex		: 'found',
				width    		: 24, 
				sortable 		: false, 
				menuDisabled	: true,
				align    		: 'center',
				renderer 		: function(val,meta,rec) {
					if (val == 0) 
					{
						meta.tdCls = 'path-not-found';
						meta.tdAttr = 'data-qtip="path not found"';
					} 
					//else if (rec.get('public') == 0 && rec.get('permission_id') == 0) 
					//{
					//	meta.tdCls = 'path-not-found';
					//	meta.tdAttr = 'data-qtip="private path with no permission is inaccessible"';
					//}
					return '';
					return '';
				} 
			},
            {
				header			: 'Path',  
				dataIndex		: 'ci_controller', 
				sortable 		: false, 
				menuDisabled	: true,
				groupable		: false,
				flex			: 2,
				renderer 		: function(val,meta,rec) 
				{
					var dir		= rec.get('dir')
						path	= Ext.util.Format.lowercase(rec.get('ci_controller')+'/'+rec.get('ci_method'));

					if (dir != '.') path = dir+'/'+path;
	
					return path;
				} 
			},
            {
				header	 	: 'Directory',  
				dataIndex	: 'dir_group', 
				flex		: 1,
				renderer 	: function(val,meta,rec) 
				{
					if (rec.get('dir')=='.') return '';
					return rec.get('dir');
				} 
			},
            {header: 'Controller',  dataIndex: 'ci_controller', flex: 1},
            {header: 'Method',  dataIndex: 'ci_method', flex: 1},
            {
				header		: 'Access',  
				dataIndex	: 'public_flag', 
				width		: 80,
				field		: 
				{
					xtype           : 'combo',
					store			:
					{
						xtype	: 'store',
						fields	: ['id', 'name'],
						data : [
							{'id':'1', 'name':'Public'},
							{'id':'0', 'name':'Private'}
						]
					},
					listConfig: {
						getInnerTpl: function() {
							return '<div class="combo-path-{name}">{name}</div>';
						}
					},
					queryMode       : 'local',
					displayField    : 'name',
					valueField      : 'id'
				},
				renderer 	: function(val,meta,rec) {
					if (val == 0) {
						meta.tdCls = 'path-private';
						return 'Private';
					}
					else if (val == 1)	
					{
						meta.tdCls = 'path-public';
						return 'Public';
					}
					return 'unknown';
				}
			}, 
            {
				header		: 'Permission',  
				dataIndex	: 'permission_name', 
				field		: 
				{
					xtype           : 'combo',
					store			: 'Permissions',
					queryMode       : 'local',
					displayField    : 'name',
					valueField      : 'id'
				},
				flex		: 2
			},
            {
				header		: 'Note',  
				dataIndex	: 'note', 
				groupable	: false,
				field		: 
				{
					xtype	:'textfield'
				},
				flex		: 3
			}
        ];

		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Verify paths',
			action	: 'find',
			iconCls	: 'map-magnify' 
		}];

		this.bbar = [{ 
			xtype	: 'button', 
			text	: '',
			action	: 'refresh',
			iconCls	: 'x-tbar-loading' 
		}];

        this.callParent(arguments);
    },

	// Add a custom function for group headers
	getGroupHeader: function (col)
	{
		if (this.groupHeaders[col] != undefined) return this.groupHeaders[col];
		return '{name}, count: {rows.length}';
	}
});
