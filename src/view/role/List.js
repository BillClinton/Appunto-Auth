Ext.define('AppuntoAuth.view.role.List' ,
{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_role_list',
    store   : 'Roles',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

    title   : Lang.localize('tab_user_roles'),
    iconCls : 'shield', 

    viewConfig: {
		loadMask : { msg : Lang.localize('loading') }
    },

	autoScroll	: true,

	columns : [
		{header: Lang.localize('name'),  dataIndex: 'name', hideable : false, flex: 2},
		{header: Lang.localize('description'),  dataIndex: 'description', hideable : false, flex: 3}
	],

	tbar : [{ 
		xtype	: 'button', 
		text	: Lang.localize('role_add'),
		action	: 'add',
		cls		: 'view-selection-button',
		iconCls	: 'shield-add' 
	}],

	bbar : [{ 
		xtype	: 'button', 
		text	: Lang.localize('refresh'),
		action	: 'refresh',
		iconCls	: 'x-tbar-loading' 
	}]

});
