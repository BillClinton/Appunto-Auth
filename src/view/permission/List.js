Ext.define('AppuntoAuth.view.permission.List' ,
{
    extend  	: 'Ext.grid.Panel',
    alias   	: 'widget.appa_permission_list',
    store   	: 'Permissions',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	autoScroll	: true,

    viewConfig: {
		loadMask : { msg : Lang.localize('loading') }
    },

	columns :
	[
		{header: Lang.localize('name'),  dataIndex: 'name', flex: 1},
		{header: Lang.localize('perm_internal_name'), dataIndex: 'internal_name', flex: 1},
		{header: Lang.localize('name'),  dataIndex: 'description', flex: 2}
	],

	tbar : 
	[{ 
		xtype	: 'button', 
		text	: Lang.localize('perm_add'),
		action	: 'add',
		cls		: 'view-selection-button',
		iconCls	: 'lock-add'
	}],

	bbar : 
	[{ 
		type	: 'button', 
		text	: Lang.localize('refresh'),
		action	: 'refresh',
		iconCls	: 'x-tbar-loading'
	}]

});
