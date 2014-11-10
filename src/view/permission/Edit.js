Ext.define('AppuntoAuth.view.permission.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_permission_edit',

    title  	: Lang.localize('perm_edit'),
    iconCls : 'lock-edit',
    layout  : 'fit',
    autoShow: false,
    modal   : true,

	items : [
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
					name		: 'id',
					width		: 0,
					type		: 'hidden'
				},
				{
					name        : 'name',
					fieldLabel	: Lang.localize('name'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: false
				},
				{
					name        : 'internal_name',
					fieldLabel	: Lang.localize('perm_internal_name'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: false
				},
				{
					name        : 'description',
					fieldLabel	: Lang.localize('description'),
					xtype       : 'textfield',
					value		: '',		// initialzing field so changes will show it as dirty
					allowBlank	: true
				}
			]
		}
	],

	buttons : [
		{
			text: 'Save',
			action: 'save'
		},
		{
			text: 'Cancel',
			handler	: function () { this.up('.window').close(); }
		}
	],

    initComponent: function() 
	{

        this.callParent(arguments);
		this.down('form').getForm().trackResetOnLoad = true;  
    }
});
