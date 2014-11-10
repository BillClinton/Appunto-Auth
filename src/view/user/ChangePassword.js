Ext.define('AppuntoAuth.view.user.ChangePassword', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_user_changepassword',

    title   : Lang.localize('password_change'),
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
					width		: 460,
					labelWidth	: 160,
					blankText   : Lang.localize('field_required'),
					msgTarget 	: 'under'
				},
                items: [
                    {
                        name        : 'username',
						fieldLabel	: Lang.localize('username'),
                        xtype       : 'displayfield'
                    },{
                        name        : 'email',
						fieldLabel	: Lang.localize('email'),
                        xtype       : 'displayfield'
                    },{
						id			: 'pass',
                        name        : 'password',
						fieldLabel	: Lang.localize('password'),
                        xtype       : 'textfield',
						inputType	: 'password',
						vtype		: 'passformat',
						style: {
            				marginTop: '18px'
        				},
						allowBlank	: false
                    },{
                        name        : 'password2',
						fieldLabel	: Lang.localize('password_confirm'),
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
				text	: Lang.localize('save'),
                action	: 'save'
            },
            {
				text	: Lang.localize('cancel'),
				handler	: function () { this.up('.window').close(); }
            }
        ];

        this.callParent(arguments);
		this.down('form').getForm().trackResetOnLoad = true;  
    }
});
