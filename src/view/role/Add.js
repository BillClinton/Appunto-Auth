Ext.define('AppuntoAuth.view.role.Add', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.appa_role_add',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

    title   : Lang.localize('role_add'),
    iconCls : 'shield-add',
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
					labelWidth	: 120,
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
    }
});
