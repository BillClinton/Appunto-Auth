Ext.define('APPA.view.permission.Add', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_permission_add',

    title   : 'Add permission',
    iconCls : 'lock-add',
    layout  : 'fit',
    autoShow: true,
    modal   : true,

    initComponent: function() 
	{
        this.items = [
            {
                xtype: 'form',
                baseCls: 'x-plain',
                border: false,
				bodyStyle: {
					padding : '10px'
				},
				defaults: {
					width		: 320,
					labelWidth	: 90,
					blankText   : 'This field is required',
					msgTarget 	: 'side'
				},
                items: [
                    {
                        name        : 'name',
						fieldLabel	: 'Name',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						minLength	: 3,
						maxLength	: 32,
						allowBlank	: false
					},
					{
                        name        : 'description',
						fieldLabel	: 'Description',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						maxLength	: 64,
						allowBlank	: true
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];


        this.callParent(arguments);
    }
});
