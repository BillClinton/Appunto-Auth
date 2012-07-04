Ext.define('APPA.view.user.Add', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_user_add',

    title   : 'Add User',
    iconCls : 'user-add',
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
						id			: 'pass',
                        name        : 'password',
						fieldLabel	: 'Password',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						inputType	: 'password',
						style: {
            				marginTop: '18px'
        				},
						allowBlank	: false
                    },{
                        name        : 'password2',
						fieldLabel	: 'Confirm Password',
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						inputType	: 'password',
						vtype		: 'passconfirm',
						passField	: 'pass',
						allowBlank	: false
                    },{
                        name        	: 'active',
						fieldLabel		: 'Set user as active',
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
    }
});
