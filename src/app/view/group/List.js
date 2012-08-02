Ext.define('APPA.view.group.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_group_list',
    store   : 'APPA.store.Groups',
    //store   : 'Groups',

    title   : 'Groups',
    iconCls : 'group', 

	autoScroll	: true,

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name', flex: 2},
            {header: 'Description',  dataIndex: 'description', flex: 3}
        ];

		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Add group',
			action	: 'add',
			iconCls	: 'group-add' 
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
