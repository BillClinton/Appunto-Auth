Ext.define('APPA.view.session.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_session_edit',

    title   : 'Edit session',
    iconCls : 'shield-edit',
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
						name		: 'id',
						width		: 0,
						type		: 'hidden'
					},
					{
                        name        : 'name',
						fieldLabel	: 'Name',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: false
					},
					{
                        name        : 'description',
						fieldLabel	: 'Description',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
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
		this.down('form').getForm().trackResetOnLoad = true;  
    }
});
