/**
 *
 */
Ext.define('AppuntoAuth.view.path.PathView' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_path_path_view',
    store   : 'PathItems',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	autoScroll	: true,
	border		: 0,

	columns : [
		{
			header   		: '', 
			dataIndex		: 'found',
			width    		: 24, 
			sortable 		: false, 
			menuDisabled	: true,
			align    		: 'center',
			renderer 		: function(val,meta,rec) 
			{
				var not_found_message;

				if (val == 0) 
				{
					not_found_message = '<p>'+Lang.localize('path_not_found_1')+'</p>';
					not_found_message += '<p>'+Lang.localize('path_not_found_2')+'</p>';
					
					meta.tdCls = 'path-not-found';
					meta.tdAttr = 'data-qtip="'+not_found_message+'"';
				} 
				//else if (rec.get('public') == 0 && rec.get('permission_id') == 0) 
				//{
				//	meta.tdCls = 'path-not-found';
				//	meta.tdAttr = 'data-qtip="private path with no permission is inaccessible"';
				//}
				return '';
			} 
		},
		{header: 'Method',  dataIndex: 'ci_method', flex: 1},
		{
			header			:  Lang.localize('path_path'),  
			dataIndex		: 'ci_method', 
			sortable 		: true, 
			menuDisabled	: true,
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
			header		:  Lang.localize('path_access'),  
			dataIndex	: 'public_flag', 
			width		: 90,
			renderer 	: function(val,meta,rec) {
				if (val == 0) {
					meta.tdCls = 'path-private';
					return Lang.localize('path_private');
				}
				else if (val == 1)	
				{
					meta.tdCls = 'path-public';
					return Lang.localize('path_public');
				}
				return 'unknown';
			}
		},
		{
			header		:  Lang.localize('path_permission'),  
			dataIndex	: 'permission_name', 
			flex		: 2
		}
	]

});
