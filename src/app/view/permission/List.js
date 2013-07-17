Ext.define('APPA.view.permission.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_permission_list',
    store   : 'APPA.store.Permissions',

    title   : 'Permissions',
    iconCls : 'lock', 

	autoScroll	: true,

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name', width: 160},
            {header: 'Internal Name',  dataIndex: 'internal_name', width: 160},
            {header: 'Description',  dataIndex: 'description', flex: 1}
        ];

		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Add permission',
			action	: 'add',
			iconCls	: 'lock-add' 
		}];

		this.bbar = [{ 
			xtype	: 'button', 
			text	: '',
			action	: 'refresh',
			iconCls	: 'x-tbar-loading' 
		}];

        this.callParent(arguments);
    }
});
