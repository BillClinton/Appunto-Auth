Ext.define('AppuntoAuth.view.status.View' ,
{
    extend  	: 'Ext.panel.Panel',
    alias   	: 'widget.appa_status_view',

	requires	: [
		'AppuntoAuth.lib.lang.Default',
		'Ext.XTemplate'
	],

	items : [
		{
			xtype		: 'dataview',
    		store  		: 'StatusInfos',
			viewConfig	: { loadMask : { msg : Lang.localize('loading') } },
			tpl 		: new Ext.XTemplate(
				'<table class="status-info">',
				'<tpl for=".">',
					'<tr class="info-item">',
						'<td>{info_item}</td>',
						'<td>{info_val}</td>',
						'<tpl if="this.noteExists(info_note)">',
							'<td class="info-note">{info_note}</td>',
						'</tpl>',	
					'</tr>',
				'</tpl>',
				'</table>',
				{
					noteExists: function(note)
					{
						return note != '';
					}
				}
			),
			itemSelector: 'div.info-item'
		}
	],

	bbar : [{ 
		xtype	: 'button', 
		text	: Lang.localize('refresh'),
		action	: 'refresh',
		iconCls	: 'x-tbar-loading'
	}]

});
