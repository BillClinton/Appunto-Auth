Ext.define('AppuntoAuth.view.permission.Add', 
{
    extend  	: 'Ext.window.Window',
    alias   	: 'widget.appa_permission_add',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	autoScroll	: true,
    title   	: Lang.localize('perm_add'),
    iconCls 	: 'lock-add',
    layout  	: 'fit',
    autoShow	: true,
    modal   	: true,

	items 		: [
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
				blankText   : Lang.localize('field_required'),
				msgTarget 	: 'under'
			},
			items: [
				{
					name        : 'name',
					fieldLabel	: Lang.localize('name'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					minLength	: 3,
					maxLength	: 32,
					allowBlank	: false
				},
				{
					name        : 'description',
					fieldLabel	: Lang.localize('description'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					maxLength	: 64,
					allowBlank	: true
				}
			]
		}
	],

	buttons : [
		{
			text: Lang.localize('save'),
			action: 'save'
		},
		{
			text: Lang.localize('cancel'),
			handler	: function () { this.up('.window').close(); }
		}
	]


});
