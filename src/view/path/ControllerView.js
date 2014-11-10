Ext.define('AppuntoAuth.view.path.ControllerView' ,{
    extend  : 'Ext.view.View',
    alias   : 'widget.appa_path_controller_view',

    store   : 'Controllers',

	requires	: [
		'AppuntoAuth.lib.lang.Default'
	],

	cls				: 'controller-view',
	itemSelector	: 'div.ci-controller',
	selectedItemCls	: 'controller-selected',
	overItemCls		: 'controller-rollover',

    initComponent: function() 
	{
		this.tpl = new Ext.XTemplate(
			'<tpl for=".">',     
				'<div class="ci-controller">',
					'<div class="selection">',
					'</div>',
					'<div class="method-info">',
						'<table>',
							'<tr><td>'+Lang.localize('controller_methods')+'</td><td> : </td><td align="right">{methods}</td></tr>',
							'<tr><td>'+Lang.localize('controller_public')+'</td><td> : </td><td align="right">{public_methods}</td></tr>',
							'<tr><td>'+Lang.localize('controller_private')+'</td><td> : </td><td align="right">{private_methods}</td></tr>',
						'</table>',
					'</div>',
					'<div class="controller-info">',
						'<span class="controller-name">{ci_controller}</span>',
						'<span class="controller-dir">{full_path}</span>',
					'</div>',
				'</div>',
			'</tpl>'
		);

        this.callParent(arguments);
	}
});
