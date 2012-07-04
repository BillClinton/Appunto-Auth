Ext.define('APPA.view.user.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_user_edit',

    title   : 'Edit User',
    iconCls : 'user-edit',
    layout  : 'fit',
    autoShow: false,
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
					labelWidth	: 120,
					blankText   : 'This field is required',
					msgTarget 	: 'side'
				},
                items: [
                    {
                        name        : 'username',
						fieldLabel	: 'Username',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: false
                    },{
                        name        : 'email',
						fieldLabel	: 'Email',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						vtype		: 'email',
						allowBlank	: false
                    },{
                        name        : 'name',
						fieldLabel	: 'Name',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: true
                    },{
                        name        : 'surname',
						fieldLabel	: 'Last name',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: true
                    },{
                        name        	: 'active',
						fieldLabel		: 'Active',
						labelAlign		: 'right',
						inputValue		: '1',
						uncheckedValue	: '0',
						style: {
            				marginTop: '18px'
        				},
                        xtype       	: 'checkbox',
						checked			: true
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
