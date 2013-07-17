Ext.define('APPA.view.role.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_role_list',
    store   : 'APPA.store.Roles',

    title   : 'Roles',
    iconCls : 'shield', 

	autoScroll	: true,

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name', width: 100},
            {header: 'Inernal Name',  dataIndex: 'internal_name', width: 100},
            {header: 'Description',  dataIndex: 'description', flex: 1}
        ];

		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Add role',
			action	: 'add',
			iconCls	: 'shield-add' 
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
