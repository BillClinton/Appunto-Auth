Ext.define('AppuntoAuth.view.role.Edit', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_role_edit',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

    title   : Lang.localize('role_edit'),
    iconCls : 'shield-edit',
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
                        name        : 'description',
						fieldLabel	: Lang.localize('description'),
                        xtype       : 'textfield',
						value		: '',		// initialzing field so changes will show it as dirty
						allowBlank	: true
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: Lang.localize('save'),
                action: 'save'
            },
            {
                text: Lang.localize('cancel'),
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
		this.down('form').getForm().trackResetOnLoad = true;  
    }
});
