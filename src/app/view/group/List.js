Ext.define('APPA.view.group.List' ,{
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.appa_group_list',
    store   : 'Groups',

    title   : 'Groups',
    iconCls : 'group', 

	autoScroll	: true,

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name', width: 100},
            {header: 'Description',  dataIndex: 'description', flex: 1}
        ];

		this.tbar = [{ 
			xtype	: 'button', 
			text	: 'Add group',
			action	: 'add',
			iconCls	: 'group-add' 
		}];

        this.callParent(arguments);
    }
});
