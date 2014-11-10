Ext.define('AppuntoAuth.view.user.Add', 
{
    extend  	: 'Ext.window.Window',
    alias   	: 'widget.appa_user_add',

	requires	:	[
		'AppuntoAuth.lib.lang.Default',
		'Ext.form.field.Checkbox',
		'AppuntoAuth.lib.util.CustomVTypes'
	],

    title   	: Lang.localize('user_add'),
    iconCls 	: 'user-add',
    layout  	: 'fit',
    autoShow	: true,
    modal   	: true,

	items : [
		{
			xtype: 'form',
			baseCls: 'x-plain',
			border: false,
			bodyStyle: {
				padding : '10px'
			},
			defaults: {
				width		: 460,
				labelWidth	: 180,
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
					id			: 'pass',
					name        : 'password',
					fieldLabel	: Lang.localize('password'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
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
					value		: '',		// initialzing field so changes will show it as dirty
					inputType	: 'password',
					vtype		: 'passconfirm',
					passField	: 'pass',
					allowBlank	: false
				},{
					name        	: 'active',
					fieldLabel		: Lang.localize('user_set_active'),
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
	],

	buttons : [
		{
			text	: Lang.localize('save'),
			action	: 'save'
		},
		{
			text	: Lang.localize('cancel'),
			handler	: function () { this.up('.window').close(); }
		}
	]

});
