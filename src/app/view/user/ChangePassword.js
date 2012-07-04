Ext.define('APPA.view.user.ChangePassword', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_user_changepassword',

    title   : 'Change Password',
    iconCls : 'key',
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
                        xtype       : 'displayfield'
                    },{
                        name        : 'email',
						fieldLabel	: 'Email',
                        xtype       : 'displayfield'
                    },{
						id			: 'pass',
                        name        : 'password',
						fieldLabel	: 'Password',
                        xtype       : 'textfield',
						inputType	: 'password',
						style: {
            				marginTop: '18px'
        				},
						allowBlank	: false
                    },{
                        name        : 'password2',
						fieldLabel	: 'Confirm Password',
                        xtype       : 'textfield',
						inputType	: 'password',
						vtype		: 'passconfirm',
						passField	: 'pass',
						allowBlank	: false
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
