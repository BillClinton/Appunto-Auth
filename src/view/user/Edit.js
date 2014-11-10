Ext.define('AppuntoAuth.view.user.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_user_edit',

	requires	:	[
		'AppuntoAuth.lib.lang.Default'
	],

    title  	: Lang.localize('user_edit'),
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
					width		: 460,
					labelWidth	: 120,
					blankText   : Lang.localize('field_required'),
					msgTarget 	: 'under'
				},
                items: [
                    {
                        name        : 'username',
						fieldLabel	: Lang.localize('username'),
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: false
                    },{
                        name        : 'email',
						fieldLabel	: Lang.localize('email'),
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						vtype		: 'email',
						vtypeText	: Lang.localize('email_format'),
						allowBlank	: false
                    },{
                        name        : 'name',
						fieldLabel	: Lang.localize('name'),
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: true
                    },{
                        name        : 'surname',
						fieldLabel	: Lang.localize('surname'),
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: true
                    },{
                        name        	: 'active',
						fieldLabel		: Lang.localize('active'),
						labelAlign		: 'left',
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
