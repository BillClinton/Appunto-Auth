Ext.define('AppuntoAuth.view.user.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_user_list',
    store   : 'Users',

	requires	: [
		'AppuntoAuth.lib.lang.Default',
		'AppuntoAuth.lib.util.SearchField',
		'Ext.grid.column.Date',
		'Ext.toolbar.Paging'
	],

	autoScroll	: true,

	border	: 0,

    viewConfig: {
        emptyText: 'No results found',
		loadMask : { msg : Lang.localize('loading') }
    },

	columns : [
		{header: Lang.localize('username'), dataIndex: 'username', menuDisabled: true, flex: 4},
		{header: Lang.localize('name'),  dataIndex: 'name', menuDisabled: true, flex: 3},
		{header: Lang.localize('surname'),  dataIndex: 'surname', menuDisabled: true, flex: 3},
		{header: Lang.localize('email'),  dataIndex: 'email', menuDisabled: true,   flex: 6},
		{
			header   :  Lang.localize('active'), 
			dataIndex: 'active',
			width    : 48, 
			sortable : true, 
			align    : 'center', 
			menuDisabled: true,
			renderer : function(val,meta,rec) {
				meta.tdCls = (rec.get('active') == 0) ? 'user-inactive' : 'user-active';
				return '';
			} 
		},
		{header: Lang.localize('last_ip'), dataIndex: 'last_ip', hidden: true, flex: 3},
		{
			header		:  Lang.localize('last_login'), 
			dataIndex	: 'last_login', 
			menuDisabled: true,
			hidden		: true,
			flex		: 4,
			renderer 	: function(val) {
				if (val == '0000-00-00 00:00:00') return Lang.localize('never'); 
				return Ext.util.Format.date(val, datetime_format);
			}
		},{
			header		:  Lang.localize('created'), 
			dataIndex	: 'created', 
			menuDisabled: true,
			hidden		: true,
			flex		: 4,
			renderer 	: function(val) {
				return Ext.util.Format.date(val, datetime_format);
			}
		},{
			header		:  Lang.localize('modified'), 
			dataIndex	: 'modified', 
			menuDisabled: true,
			hidden		: true,
			flex		: 4,
			renderer 	: function(val) {
				return Ext.util.Format.date(val, datetime_format);
			}
		}
	],

	tbar : [{ 
		xtype	: 'button', 
		text	: Lang.localize('user_add'),
		action	: 'add',
		cls		: 'view-selection-button',
		iconCls	: 'user-add'
	},{
		xtype	: 'searchfield',
    	store   : 'Users'
	},{
		xtype	: 'tbfill'
	},{
		xtype	: 'tool',
		type	: 'next'
	}],

	bbar : [{ 
		xtype		: 'pagingtoolbar',
		store   	: 'Users',
		displayInfo	: true,
		displayMsg 	: Lang.localize('paging_message')
	}]


});
